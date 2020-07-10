<template>
  <div class="error">
    <b-img :src="imageSrc" />
    <h1 class="error__title">Ooops! Something went wrong here...</h1>
    <b-button class="error__button" @click="goToHomePage"
      >BACK TO HOMEPAGE</b-button
    >
  </div>
</template>

<script>
import { EVENTS_ROUTE, LOGIN_ROUTE } from '@/utils/constants'
import { getImageContext } from '@/utils/stringUtils'

export default {
  name: 'Error',
  computed: {
    imageSrc() {
      return getImageContext('alert')
    }
  },
  methods: {
    goToHomePage() {
      this.$router.push(this.$auth.isAuthenticated ? EVENTS_ROUTE : LOGIN_ROUTE)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';

.error {
  background: $color-primary;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    color: $color-white;
    margin: 36px;
  }

  &__button {
    @extend .btn-text;
    width: fit-content;
  }
}
</style>
