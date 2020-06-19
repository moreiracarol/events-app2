<template>
  <div class="sort-by">
    <span class="sort-by__title">Sort by</span>
    <select
      id="orderBy"
      v-model="sort"
      data-sort-select
      @change="sortEvents(sort)"
    >
      <option
        v-for="(option, index) in sortOptions"
        :key="index"
        :value="option.value"
        data-sort-options
        v-text="option.text"
      />
    </select>
  </div>
</template>

<script>
import { SORT_OPTIONS } from '@/utils/constants'
export default {
  name: 'SortBy',
  data() {
    return {
      sort: '',
      sortOptions: SORT_OPTIONS
    }
  },
  methods: {
    sortEvents(sort) {
      this.$emit('sortEvents', sort)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/events-app';
.sort-by {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  padding: 0 8px 16px;
  color: $color6;

  &__title {
    padding-right: 8px;
  }

  #orderBy {
    height: 30px;
    width: 120px;
    background: $color2;
    color: $color6;

    &:hover {
      border: solid 1px $color6;
      background: $color1;
      cursor: pointer;
    }
  }
}
</style>
