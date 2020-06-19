<template>
  <div class="view-layout">
    <div class="view-layout__header">
      <h1 data-events-title>{{ pageTitle }}</h1>
      <button class="highlight-button" @click="logout">Logout</button>
    </div>
    <button class="primary-button" data-favorites-button @click="goToPage">
      {{ button }}
    </button>
    <slot name="content" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGIN_ROUTE } from '@/utils/constants'

export default {
  name: 'ViewLayout',
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      authLogout: 'auth/logout'
    }),
    logout() {
      this.authLogout()
      this.$router.push(LOGIN_ROUTE)
    },
    goToPage() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';
.view-layout {
  max-width: $max-content-size;
  margin: 24px auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0;
  }
}
</style>
