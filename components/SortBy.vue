<template>
  <div class="sort-by">
    <b-form-select
      v-model="selected"
      :options="options"
      @change="sortEvents(selected)"
    />
  </div>
</template>

<script>
import { SORT_OPTIONS } from '@/utils/constants'
export default {
  name: 'SortBy',
  data() {
    return {
      selected: null,
      options: SORT_OPTIONS
    }
  },
  methods: {
    sortEvents(selected) {
      this.$emit('sortEvents', selected)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';
.sort-by {
  max-width: 240px;
  padding: 16px 0;
  color: $color-secondary;
}
</style>
