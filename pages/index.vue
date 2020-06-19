<template>
  <div class="container">
    <div v-if="!$auth.isAuthenticated">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
    <div v-else>
      <p>You're logged as {{ $auth.email }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      authLogout: 'auth/logout'
    }),
    logout() {
      this.authLogout()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
