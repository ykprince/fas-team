<template lang="">
  <div class="container">
    <h2>THis is paper</h2>
    <div
      v-for="rpItem in rollingpaperObj"
      :key="rpItem"
      class="paper-objects-container"
    >
      <h2>{{ rpItem.paperName }}</h2>
      <span @click="rmThispaper(rpItem)">delete</span>
    </div>
  </div>
</template>
<script setup>
// store.js에서 개인정보-롤링페이퍼정보 수신
// 임시 데이터
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const rollingpaperObj = computed(() => store.state.rollingpaper.paperObj)
console.log(rollingpaperObj)

const rmThispaper = function (rpItem) {
  console.log(rpItem)
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  padding: 2rem;
  border: 1px solid grey;
  margin: 0 2rem;
}

h2 {
  padding-top: 10%;
  text-align: center;
}

.paper-objects-container {
  position: relative;
  width: 50%;
  border: 2px solid grey;
  border-radius: 1.5rem;

  span {
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    background-color: rgb(255, 220, 220);
    border-radius: 0.5rem 0.5rem 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
}

@media (max-width: 400px) {
  .container {
    width: 100%;
    max-width: 35rem;
  }

  .paper-objects-container {
    width: 50%;
  }
}
</style>
