<template>
  <div class="login">
    <h1>Login</h1>
    <form class="login__form" @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" class="highlight-button">Login</button>
    </form>
    <nuxt-link to="/register">Don't have an account? Create</nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { EVENTS_ROUTE } from '@/utils/constants'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  created() {
    if (this.$auth.isAuthenticated) {
      this.$router.push(EVENTS_ROUTE)
    }
  },
  methods: {
    ...mapActions({
      authLogin: 'auth/login'
    }),
    async login() {
      await this.authLogin({ email: this.email, password: this.password })
      this.$router.push(EVENTS_ROUTE)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';
.login {
  max-width: 480px;
  margin: auto;

  &__form {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
