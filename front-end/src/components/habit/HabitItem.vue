<template>
    <div class="item">
        {{ habit.title }}
    </div>
</template>

<script>
export default {
  props: {
    habit: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  background-color: $blue;
}
</style>
