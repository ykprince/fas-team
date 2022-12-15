<template lang="">
  <div class="container">
    <div
      v-for="rpItem in rollingpaperObj"
      :key="rpItem"
      class="paper-objects-container"
    >
      <h2>{{ rpItem.paperName }}</h2>
      <span @click="rmThispaper(rpItem)">delete</span>
    </div>
  </div>
  <modal-popup class="modal" v-if="deleteModal" :modalText="modalText" :submitEmit="deletePaper"></modal-popup>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import modalPopup from '@/components/modalPopup.vue'

const waitingDeleteObj = ref({})
const deleteModal = ref(false) // 삭제버튼 눌렀을 때 모달 컴포넌트 출력
const modalText = ref('삭제')
const store = useStore()
const rollingpaperObj = computed(() => store.state.rollingPaper.paperObj) // 롤링페이퍼 obj

const rmThispaper = function (rpItem) {
  waitingDeleteObj.value = rpItem
  deleteModal.value = true
}

const deletePaper = () => {
  // action  정의 필요
  console.log(waitingDeleteObj)
  // deleteModal.value = false
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1200px;
  display: flex;

  padding: 2rem;
  border: 1px solid grey;
  margin: 0 auto;
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

  &:not(:last-of-type) {
    margin-right: 2rem;
  }

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
