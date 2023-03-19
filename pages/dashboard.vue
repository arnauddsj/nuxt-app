<script setup lang="ts">
const { data, status, getCsrfToken, getProviders, signIn, signOut } = useSession()
const providers = await getProviders()
const csrfToken = await getCsrfToken()
</script>

<template>
  <div>
    <div>
      <div>
        <img
          v-if="status === 'authenticated' && data?.user?.image"

          :src="data.user.image"
          alt="User Avatar"
        >
        <h1 v-if="status === 'authenticated'" class="text-lg">
          Authenticated as {{ data?.user?.name }}!
        </h1>
        <h1 v-else>
          Not logged in
        </h1>
      </div>
      <button v-if="status === 'authenticated'" @click="signOut({ callbackUrl: '/' })">
        <span>Logout</span>
      </button>
      <button v-else @click="signIn()">
        <span>Login</span>
      </button>
    </div>
    <h3>
      Authentication Overview
    </h3>
    <p>
      See all available authentication & session information below.
    </p>
    <div v-if="status">
      <span>Status:</span> {{ status }}
    </div>
    <div v-if="data">
      <span>Data:</span> {{ data }}
    </div>
    <div v-if="csrfToken">
      <span>CSRF Token:</span> {{ csrfToken }}
    </div>
    <div v-if="providers">
      <span>Providers:</span> {{ providers }}
    </div>
  </div>
</template>
