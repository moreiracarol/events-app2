<template>
  <div class="events-list">
    <div v-if="isEmptyScreen">No events to show</div>
    <div v-else>
      <SortBy v-if="showAllEvents" data-sort-events @sortEvents="sortEvents" />
      <Card
        v-for="(event, index) in eventsList"
        :key="index"
        :event="event"
        data-card
      />
      <Pagination
        v-if="showPagination"
        :total-pages="totalPages"
        @click="gotoPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SORT_OPTIONS } from '@/utils/constants'
import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import SortBy from '@/components/SortBy'

export default {
  name: 'EventsList',
  components: {
    SortBy,
    Pagination,
    Card
  },
  props: {
    showAllEvents: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eventsList: [],
      page: 0,
      sort: '',
      totalPages: 0,
      sortOptions: SORT_OPTIONS
    }
  },
  computed: {
    ...mapGetters({
      events: 'events',
      pages: 'totalPages'
    }),
    isEmptyScreen() {
      return this.eventsList && !this.eventsList.length
    },
    showPagination() {
      return this.showAllEvents && this.totalPages > 1
    }
  },
  async created() {
    await this.loadList()
  },
  methods: {
    ...mapActions({
      getEvents: 'getEvents',
      getFavorites: 'getFavorites'
    }),
    async loadList(sort) {
      this.showAllEvents
        ? await this.getEvents({ page: this.page, sort })
        : await this.getFavorites()
      this.totalPages = this.pages
      this.eventsList = this.events
    },
    gotoPage(page) {
      this.page = page - 1
      this.loadList()
    },
    sortEvents(sort) {
      this.loadList(sort)
    }
  }
}
</script>

<style scoped lang="scss">
.events-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
}
</style>
