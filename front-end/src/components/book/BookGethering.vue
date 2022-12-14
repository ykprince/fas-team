<template>
    <RouterLink
      :to="`/`"
      :style="{ backgroundImage: `url(${book.thumbnail})` }"
      class="book">
      <div class="info">
        <div class="year">
          {{ book.datetime }}
        </div>
        <div class="title">
          {{ book.title }}
        </div>
      </div>
    </RouterLink>
  </template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
