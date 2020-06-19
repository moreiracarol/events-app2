<template>
  <div class="container">
    <div v-if="!$auth.isAuthenticated">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
  </div>
</template>

<script>
import { EVENTS_ROUTE } from '@/utils/constants'

export default {
  created() {
    if (this.$auth.isAuthenticated) {
      this.$router.push(EVENTS_ROUTE)
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
