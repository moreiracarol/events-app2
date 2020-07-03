<template>
  <div class="register">
    <h1>Register</h1>
    <b-form
      v-if="step === steps.register"
      class="register__form"
      @submit.prevent="register"
    >
      <b-form-input
        v-model="registerForm.email"
        type="email"
        placeholder="Email"
      />
      <b-form-input
        v-model="registerForm.password"
        type="password"
        placeholder="Password"
      />
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
    <b-form
      v-if="step === steps.confirm"
      class="register__form"
      @submit.prevent="confirm"
    >
      <b-form-input
        v-model="confirmForm.email"
        type="email"
        placeholder="Email"
      />
      <b-form-input v-model="confirmForm.code" placeholder="Code" />
      <b-button type="submit" variant="primary">Confirm</b-button>
    </b-form>
    <nuxt-link to="login">Have an account? Login</nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { EVENTS_ROUTE } from '@/utils/constants'

const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM'
}

export default {
  name: 'Register',
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
  created() {
    if (this.$auth.isAuthenticated) {
      this.$router.push(EVENTS_ROUTE)
    }
  },
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
      this.$router.push(EVENTS_ROUTE)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';
.register {
  max-width: 480px;
  margin: auto;

  &__form {
    margin: 16px 0;
  }
}
</style>
