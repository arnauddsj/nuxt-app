<script setup lang="ts">
const { status } = useSession()
definePageMeta({ auth: false })

</script>

<template>
  <div>
    <h1>Welcome</h1>

    <div v-if="status === 'authenticated'">
      <NuxtLink to="/dashboard">
        Dashboard
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/auth/login">
        Login
      </NuxtLink>
      <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    </div>
  </div>
</template>
