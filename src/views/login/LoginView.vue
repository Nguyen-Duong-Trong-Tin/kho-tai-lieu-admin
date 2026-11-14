<script setup lang="ts">
import { Eye, EyeOff, LibraryBig, LoaderCircle } from '@lucide/vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useStore } from 'vuex'

import { loginAuthApi } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { safeRedirect, saveTokens } from '@/utils/auth'
import { getApiErrorMessage } from '@/utils/error'

const route = useRoute()
const router = useRouter()
const store = useStore()

const form = reactive({
  email: '',
  password: '',
})
const showPassword = ref(false)
const isSubmitting = ref(false)

const handleLogin = async () => {
  isSubmitting.value = true
  try {
    const { data } = await loginAuthApi({ email: form.email.trim(), password: form.password })

    saveTokens(data.accessToken, data.refreshToken)
    store.commit('auth/setUserMutation', data.user)
    toast.success(`Xin chào, ${data.user.fullName}`)

    await router.replace(safeRedirect(route.query.redirect))
  } catch (error) {
    // 400: wrong email/password, 403: the account is not an ADMIN
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader class="justify-items-center text-center">
      <div
        class="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"
      >
        <LibraryBig class="size-6" />
      </div>
      <CardTitle class="text-xl font-semibold">Kho Tài Liệu</CardTitle>
      <CardDescription>Đăng nhập trang quản trị</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="grid gap-4" @submit.prevent="handleLogin">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">Mật khẩu</Label>
          <div class="relative">
            <Input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="pr-9"
              required
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
              :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" class="w-full" :disabled="isSubmitting">
          <LoaderCircle v-if="isSubmitting" class="animate-spin" />
          {{ isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
