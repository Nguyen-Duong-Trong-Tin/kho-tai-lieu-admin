<script setup lang="ts">
import { LibraryBig, LogOut } from '@lucide/vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useStore } from 'vuex'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { IUser } from '@/interfaces/users'

const store = useStore()
const router = useRouter()

const user = computed<IUser | null>(() => store.state.auth.user)

const handleLogout = async () => {
  await store.dispatch('auth/logoutAction')
  toast.success('Đã đăng xuất')
  await router.replace({ name: 'login' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-muted">
    <header class="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div class="flex items-center gap-2 font-semibold">
        <LibraryBig class="size-5" />
        Kho Tài Liệu
        <Badge variant="secondary">Quản trị</Badge>
      </div>

      <div v-if="user" class="flex items-center gap-3">
        <div class="hidden text-right leading-tight sm:block">
          <p class="text-sm font-medium">{{ user.fullName }}</p>
          <p class="text-xs text-muted-foreground">{{ user.email }}</p>
        </div>
        <Button variant="outline" @click="handleLogout">
          <LogOut />
          Đăng xuất
        </Button>
      </div>
    </header>

    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>
