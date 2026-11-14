<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const route = useRoute()

// The login page has no header; every other page does
const layout = computed(() => (route.meta.public ? LayoutAuth : LayoutDefault))
</script>

<template>
  <!-- Rendered once the first navigation has resolved, i.e. after the guard loaded the user -->
  <component :is="layout" v-if="route.matched.length > 0" />
  <Toaster position="bottom-right" richColors />
</template>
