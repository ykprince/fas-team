<template>
    <div class="spinner">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('habit', [
      'habit'
    ])
  }
}
</script>

<style lang="scss" scoped>
.spinner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 10;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: gray;
}
</style>
