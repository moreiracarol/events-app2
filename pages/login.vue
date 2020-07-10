<template>
  <div class="login">
    <Form
      title="Login"
      footer-label="Don't have an account? Create"
      footer-link="/register"
      button-label="Login"
      @submit="login"
    >
      <div slot="form-fields">
        <b-form-input v-model="email" type="email" placeholder="Email" />
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { EVENTS_ROUTE } from '@/utils/constants'
import Form from '@/layouts/Form'

export default {
  name: 'Login',
  components: { Form },
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

<style scoped></style>
