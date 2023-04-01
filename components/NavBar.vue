<script lang="ts" setup>
const { status, signOut } = useSession()
</script>

<template>
  <nav class="flex justify-between">
    <ul class="flex gap-1">
      <li class="red">
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <div v-if="status === 'authenticated'">
          <NuxtLink to="/profile">
            profile
          </NuxtLink>
        </div>
      </li>
    </ul>
    <div>
    
      <div v-if="status !== 'authenticated'">
        <NuxtLink to="/auth/login">
          Login
        </NuxtLink>
      </div>
      <button v-else @click="signOut({ callbackUrl: '/' })">
        <span>Logout</span>
      </button>
    </div>
  </nav>
</template>

<style scoped></style>
