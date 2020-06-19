<template>
  <div class="register">
    <h1>Register</h1>
    <form
      class="register__form"
      v-if="step === steps.register"
      @submit.prevent="register"
    >
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
      <button type="submit" class="highlight-button">Register</button>
    </form>
    <form
      class="register__form"
      v-if="step === steps.confirm"
      @submit.prevent="confirm"
    >
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
      <button type="submit" class="highlight-button">Confirm</button>
    </form>
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
    margin: 24px 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
