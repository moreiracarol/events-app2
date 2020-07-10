<template>
  <Page
    page-title="FAVORITES"
    button-label="See all events"
    @click="goToEvents"
  >
    <div slot="content">
      <EventsList />
    </div>
  </Page>
</template>

<script>
import EventsList from '@/components/EventsList'
import { EVENTS_ROUTE } from '@/utils/constants'
import Page from '@/layouts/Page'
export default {
  name: 'Favorites',
  components: { EventsList, Page },
  methods: {
    goToEvents() {
      this.$router.push(EVENTS_ROUTE)
    }
  }
}
</script>

<style scoped></style>
