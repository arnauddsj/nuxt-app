<script setup lang="ts">
const { data, status, getCsrfToken, getProviders } = useAuth()

const userStore = useUserStore()

const { user, isAuth } = storeToRefs(userStore)

const providers = await getProviders()
const csrfToken = await getCsrfToken()

</script>

<template>
  <div class="flex flex-col gap-1">
    <h1>User Profile</h1>
    <div>
      <div>
        <img
          v-if="status === 'authenticated' && data?.user?.image"

          :src="data.user.image"
          alt="User Avatar"
        >
        <h1 class="h1">
          Authenticated as {{ data?.user?.name }}!
        </h1>
      </div>
    </div>
    <h3>
      Authentication Overview
    </h3>
    <h4>Store</h4>
    <div>isAuth:{{ isAuth }} / user: {{ user }}</div>
    <h4>useSession</h4>
    <p>
      See all available authentication & session information below.
    </p>
    <div v-if="status">
      <span>Status:</span> {{ status }}
    </div>
    <div v-if="data">
      <span>data.user:</span> {{ data.user }}
    </div>

    <div v-if="csrfToken">
      <span>CSRF Token:</span> {{ csrfToken }}
    </div>
    <div v-if="providers">
      <span>Providers:</span>
      <div v-for="(provider, name, index) in providers" :key="index">
        {{ provider }}
      </div>
    </div>
  </div>
</template>
