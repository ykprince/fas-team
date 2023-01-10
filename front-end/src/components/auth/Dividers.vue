<template lang="">
  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
    <ol class="breadcrumb">

      <li
      class="breadcrumb-item"
      v-for="(nav, index) in props.navList" :key="index"
      :class="index === props.navList.length - 1 ? 'active' : ''"
      v-bind:aria-current="index === props.navList.length - 1 ? 'page' : ''"
      >
      <router-link :to="nav.path">
        {{nav.name}} {{index}}
      </router-link>
    </li>

  </ol>
</nav>
</template>
<script setup>
import defineProps from 'vue-router'
const props = defineProps({
  navList: {
    type: Array,
    default () {
      return []
    }
  }
})
</script>
<style lang="">

</style>
