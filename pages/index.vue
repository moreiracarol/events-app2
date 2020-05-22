<template>
  <div class="container">
    <events />
  </div>
</template>

<script>
import Events from '@/pages/Events'
export default {
  components: { Events }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
