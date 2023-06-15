<template>
  <div>
    <p>Sign-In Options:</p>
    <div class="flex flex-col" />
    <button @click="signIn('github', {callbackUrl: '/profile'})">
      Github
    </button>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <button @click="signIn('email', {email: 'useremail@email.com'})">
      Magic link
    </button>
  </div>
</template>
<script setup lang="ts">
const { signIn } = useAuth()

definePageMeta({ auth: false })
</script>
