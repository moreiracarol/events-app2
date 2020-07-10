<template>
  <div class="container">
    <h1>Welcome! Let's start...</h1>
  </div>
</template>

<script>
import { EVENTS_ROUTE, LOGIN_ROUTE } from '@/utils/constants'

export default {
  created() {
    this.$router.push(this.$auth.isAuthenticated ? EVENTS_ROUTE : LOGIN_ROUTE)
  }
}
</script>

<style>
.container {
  margin: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
