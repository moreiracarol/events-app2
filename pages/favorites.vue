<template>
  <view-layout
    page-title="FAVORITES"
    button="See all events"
    @click="goToEvents"
  >
    <div slot="content">
      <EventsList />
    </div>
  </view-layout>
</template>

<script>
import EventsList from '@/components/EventsList'
import { EVENTS_PATH } from '@/utils/constants'
import ViewLayout from '@/layouts/viewLayout'
export default {
  name: 'Favorites',
  components: { EventsList, ViewLayout },
  methods: {
    goToEvents() {
      this.$router.push(EVENTS_PATH)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/events-app';
</style>
