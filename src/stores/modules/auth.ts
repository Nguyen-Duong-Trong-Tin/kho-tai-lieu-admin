import type { ActionContext } from 'vuex'

import { logoutAuthApi, meAuthApi } from '@/apis/auth'
import type { IUser } from '@/interfaces/users'
import { clearTokens, getAccessToken } from '@/utils/auth'
import { isAuthError } from '@/utils/error'

export interface IAuthState {
  user: IUser | null
}

type AuthContext = ActionContext<IAuthState, unknown>

const state = (): IAuthState => {
  return {
    user: null,
  }
}

const getters = {}

const mutations = {
  setUserMutation(state: IAuthState, user: IUser | null) {
    state.user = user
  },
}

const actions = {
  async findMeAction(context: AuthContext) {
    const { data } = await meAuthApi()
    context.commit('setUserMutation', data)
    return data
  },
  // Loads the logged-in user from the saved token (once per page load)
  async restoreSessionAction(context: AuthContext) {
    if (context.state.user || !getAccessToken()) {
      return
    }
    try {
      await context.dispatch('findMeAction')
    } catch (error) {
      // Keep the tokens when the server is unreachable; drop them once it rejects them
      if (isAuthError(error)) {
        clearTokens()
      }
    }
  },
  async logoutAction(context: AuthContext) {
    try {
      await logoutAuthApi()
    } catch {
      // The token may already be expired or revoked; clear the local session anyway
    }
    clearTokens()
    context.commit('setUserMutation', null)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
