<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { IUser } from '@/interfaces/users'

const store = useStore()

const user = computed<IUser | null>(() => store.state.auth.user)
</script>

<template>
  <Card class="mx-auto max-w-3xl">
    <CardHeader>
      <CardTitle class="text-xl font-semibold">Xin chào, {{ user?.fullName }}</CardTitle>
      <CardDescription>Trang quản trị Kho Tài Liệu — các chức năng sẽ code sau.</CardDescription>
    </CardHeader>
  </Card>
</template>
