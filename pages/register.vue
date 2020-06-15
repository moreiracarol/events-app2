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
    async register() {
      try {
        await this.$store.dispatch('auth/register', this.registerForm)
        this.confirmForm.email = this.registerForm.email
        this.step = this.steps.confirm
      } catch (e) {
        console.log(e)
      }
    },
    async confirm() {
      try {
        await this.$store.dispatch('auth/confirmRegistration', this.confirmForm)
        await this.$store.dispatch('auth/login', this.registerForm)
        this.$router.push('/events')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
