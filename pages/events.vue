<template>
  <view-layout page-title="EVENTS" button="My favorites" @click="goToFavorites">
    <div slot="content">
      <EventsList :show-all-events="true" data-events-list />
    </div>
  </view-layout>
</template>
.
<script>
import EventsList from '@/components/EventsList'
import { FAVORITES_PATH } from '@/utils/constants'
import ViewLayout from '@/layouts/viewLayout'

export default {
  name: 'Events',
  components: { ViewLayout, EventsList },
  methods: {
    goToFavorites() {
      this.$router.push(FAVORITES_PATH)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/events-app';
</style>
