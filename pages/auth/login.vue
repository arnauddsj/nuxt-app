<template>
  <div>
    <p>Sign-In Options:</p>
    <button @click="signIn('github', {callbackUrl: '/dashboard'})">
      Github
    </button>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <button @click="signIn('email', {email: 'useremail@email.com'})">
      Magic link
    </button>
  </div>
</template>
<script setup lang="ts">

const { signIn } = useSession()

definePageMeta({ auth: false })
</script>
