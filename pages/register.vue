<template>
  <div>
    <h1>Register</h1>
    <div>
      <form v-if="step === steps.register" @submit.prevent="register">
        <input
          v-model="registerForm.email"
          type="email"
          placeholder="Email"
          class="form-control"
        />
        <input
          v-model="registerForm.password"
          type="password"
          placeholder="Password"
          class="form-control"
        />
        <button type="submit" class="button--green">Register</button>
      </form>
      <form v-if="step === steps.confirm" @submit.prevent="confirm">
        <input
          v-model="confirmForm.email"
          type="email"
          placeholder="Email"
          class="form-control"
        />
        <input
          v-model="confirmForm.code"
          placeholder="Code"
          class="form-control"
        />
        <button type="submit" class="button--green">Confirm</button>
      </form>
      <nuxt-link to="login">Have an account? Login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM'
}

export default {
  name: 'register',
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: '',
      password: ''
    },
    confirmForm: {
      mail: '',
      code: ''
    }
  }),
  methods: {
    ...mapActions({
      authRegister: 'auth/register',
      authConfirmRegistration: 'auth/confirmRegistration',
      authLogin: 'auth/login'
    }),
    async register() {
      await this.authRegister(this.registerForm)
      this.confirmForm.email = this.registerForm.email
      this.step = this.steps.confirm
    },
    async confirm() {
      await this.authConfirmRegistration(this.confirmForm)
      await this.authLogin(this.registerForm)
      this.$router.push('/events')
    }
  }
}
</script>

<style scoped></style>
