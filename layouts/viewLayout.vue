<template>
  <div class="view-layout">
    <h1 data-events-title>{{ pageTitle }}</h1>
    <button class="primary-button" data-favorites-button @click="goToPage">
      {{ button }}
    </button>
    <slot name="content" />
  </div>
</template>

<script>
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
    goToPage() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/events-app';
.view-layout {
  max-width: $max-content-size;
  margin: 24px auto;
}
</style>
