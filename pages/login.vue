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
      <button @click="$store.dispatch('auth/logout')">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async login() {
      await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
      this.$router.push('/events')
    }
  }
}
</script>

<style scoped></style>
