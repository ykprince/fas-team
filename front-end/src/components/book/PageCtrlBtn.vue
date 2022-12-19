<template>
  <button
    class="btn btn-primary"
    @click="$emit('pageCtrl', index)">
    {{msg}}
  </button>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '1'
    },
    index: {
      type: Number,
      default: 1
    }
  }
}
</script>
