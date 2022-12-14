<template lang="">
<div class="section">
  <transition-group name="list" tag="div">
    <div class="container" v-if="showAddListArea">
      <div class="item"><span>올해를 써내려갈 공간</span></div>
      <div class="item"><span>item 2</span></div>
      <div class="item"><span>item 3</span></div>
      <div class="item"><span>item 4</span></div>
    </div>
  </transition-group>
  <add-btn @showListToAdd="showListToAdd" ></add-btn>
</div>
</template>
<script setup>
import { ref } from 'vue'
import AddBtn from '@/components/AddBtn.vue'

const showAddListArea = ref(false)

const showListToAdd = () => {
  showAddListArea.value = !showAddListArea.value
}
</script>
<style lang="scss" scoped>
.section{
  display: flex;
  flex-direction: column;
}
  .container{
    width: 25rem;
    position: fixed;
    right: 5%;
    bottom: 5%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;

    .item {
      width: 100%;
      height: 10rem;
      background-color: rgb(247, 247, 247);
      border: 1px solid grey;
      box-shadow: 3px 3px 2px rgb(206, 206, 206);
      transition: 0.1s ease all;
      margin-bottom: 1rem;
      border-radius: 1rem 1rem 1rem;
      padding: 0 auto;

      span {
        font-size: 1.7rem;
      }

      &:hover {
        background-color: rgb(236, 236, 236);
        cursor: pointer;

        span {
          font-size: 1.8rem;
        }
      }
    }
  }

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translatey(3rem);
}
</style>
