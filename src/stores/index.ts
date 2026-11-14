import { createStore } from 'vuex'

import auth, { type IAuthState } from './modules/auth'

export interface IRootState {
  auth: IAuthState
}

export default createStore<IRootState>({
  modules: {
    auth,
  },
})
