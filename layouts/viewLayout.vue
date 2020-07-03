<template>
  <div class="view-layout">
    <div class="view-layout__header">
      <h1 data-events-title>{{ pageTitle }}</h1>
      <b-button variant="primary" @click="logout">Logout</b-button>
    </div>
    <div class="view-layout__body">
      <b-button variant="secondary" data-favorites-button @click="goToPage">
        {{ button }}
      </b-button>
      <slot name="content" />
    </div>
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
  padding: 8px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    height: 100px;
    background: $color1;
    z-index: 2;
    padding: 0 24px;
    box-shadow: 8px 4px 4px $color2;
  }

  &__body {
    margin-top: 120px;
  }
}
</style>
