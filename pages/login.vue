<template>
  <div>
    <h1>Login</h1>
    <div v-if="!$auth.isAuthenticated">
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-control"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-control"
        />
        <button type="submit" class="button--green">Login</button>
      </form>
      <nuxt-link to="/register">Don't have an account? Create</nuxt-link>
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
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    ...mapActions({
      authLogin: 'auth/login',
      authLogout: 'auth/logout'
    }),
    async login() {
      await this.authLogin({ email: this.email, password: this.password })
      this.$router.push('/events')
    },
    logout() {
      this.authLogout()
    }
  }
}
</script>

<style scoped></style>
