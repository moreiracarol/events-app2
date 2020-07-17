<template>
  <div class="register">
    <Form
      v-if="step === steps.register"
      title="Register"
      footer-link="/login"
      footer-label="Have an account? Login"
      button-label="Register"
      @submit="register"
    >
      <div slot="form-fields">
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
      </div>
    </Form>
    <Form
      v-if="step === steps.confirm"
      title="Confirm"
      footer-link="/login"
      footer-label="Have an account? Login"
      button-label="Confirm"
      @submit="confirm"
    >
      <div slot="form-fields">
        <b-form-input
          v-model="confirmForm.email"
          type="email"
          placeholder="Email"
        />
        <b-form-input v-model="confirmForm.code" placeholder="Code" />
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { EVENTS_ROUTE } from '@/utils/constants'
import Form from '@/layouts/Form'

const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM'
}

export default {
  name: 'Register',
  components: { Form },
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: '',
      password: ''
    },
    confirmForm: {
      email: '',
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
    register() {
      this.authRegister(this.registerForm)
      this.confirmForm.email = this.registerForm.email
      this.step = this.steps.confirm
    },
    confirm() {
      this.authConfirmRegistration(this.confirmForm)
      this.authLogin(this.registerForm)
      this.$router.push(EVENTS_ROUTE)
    }
  }
}
</script>

<style scoped></style>
