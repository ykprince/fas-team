<template>
    <div>
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
