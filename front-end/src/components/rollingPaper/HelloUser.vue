<template>
  <div class="header-text">
    <span>반가워요,</span>
    <h2>{{userName}}</h2>
    <span>님</span>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const userName = computed(() => store.state.auth.auth.name)
</script>
<style lang="scss" scoped>
.header-text{
    flex:1;
    min-width: 180px;
    text-align:left;

    h2 {
      display: inline-block;
      font-size: 2.7rem;
      font-weight: bold;
    }
    span{
      font-size: 1.8rem;
    }
  }
</style>
