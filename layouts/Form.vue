<template>
  <div class="form">
    <h1 v-text="title"></h1>
    <b-form class="form__fields" @submit.prevent="submit">
      <slot name="form-fields"></slot>
      <b-button
        class="form__button"
        type="submit"
        variant="primary"
        v-text="buttonLabel"
      />
    </b-form>
    <nuxt-link :to="footerLink" v-text="footerLabel"></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    title: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: ''
    },
    footerLabel: {
      type: String,
      default: ''
    },
    footerLink: {
      type: String,
      default: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  max-width: 480px;
  margin: 80px auto;

  &__fields {
    margin: 16px 0;
  }

  &__button {
    margin-top: 8px;
  }
}
</style>
