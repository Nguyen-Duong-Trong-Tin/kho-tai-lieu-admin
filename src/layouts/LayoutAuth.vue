<template>
  <div class="flex min-h-screen flex-col bg-muted">
    <main class="flex flex-1 items-center justify-center p-4">
      <router-view />
    </main>
    <footer class="py-4 text-center text-xs text-muted-foreground">
      © {{ new Date().getFullYear() }} Kho Tài Liệu
    </footer>
  </div>
</template>
