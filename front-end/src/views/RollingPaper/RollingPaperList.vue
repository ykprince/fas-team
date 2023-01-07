<template lang="">
  <div class="container" v-if="rollingpaperObj.length > 0">
    <div class="container-header">
      <hello-user></hello-user>
      <div class="add-new-button">
        <button @click="router.push('/add-rollingpaper')">새로운 롤링페이퍼</button>
      </div>
    </div>
    <div class="content-repeat-area">
      <paperListItem
      v-for="rpItem in rollingpaperObj"
      :key="rpItem"
      class="paper-objects-items"
      :rpItem="rpItem"
      @showDeleteModal="showDeleteModal"
      ></paperListItem>
    </div>
  </div>
  <div v-else class="no-flex-container">
    <h2>아직 추가한 페이지가 없어요😢</h2>
    <h2>주변에 자랑할 수 있는, 나의 롤링 페이퍼를 추가해볼까요?</h2>
    <div class="add-new-paper-area">
      <router-link to="add-rollingpaper">추가하러 가기🚀</router-link>
    </div>
  </div>
  <transition name="modal" tag="div">
    <modal-popup class="paper-modal-vue" v-if="deleteModal" :modalText="modalText" :btnText1="btnText1" :btnText2="btnText2" :submitEmit="deletePaper" @submitEmit="submitChk" @cancelEmit="cancelChk"></modal-popup>
  </transition>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HelloUser from '@/components/rollingPaper/HelloUser.vue'
import modalPopup from '@/components/modalPopup.vue'
import paperListItem from '@/components/rollingPaper/paperListItem.vue'
const router = useRouter()
const waitingDeleteObj = ref({})
const deleteModal = ref(false) // 삭제버튼 눌렀을 때 모달 컴포넌트 출력
const modalText = ref('삭제 하시겠습니까?')
const btnText1 = ref('확인')
const btnText2 = ref('취소')
const store = useStore()
const userInfo = computed(() => store.state.auth.auth) // 로그인정보 조회

const rollingpaperObj = computed(() => store.state.rollingPaper.all) // 롤링페이퍼
onMounted(() => {
  if (Object.keys(userInfo.value).length === 0) {
    router.push('/auth/login')
  } else {
    console.log('disp[atch getallpapers]')
    store.dispatch('getAllPapers', userInfo.value.uid)
  }
})

const submitChk = async () => { // 삭제확인
  await store.dispatch('deletePaper', waitingDeleteObj.value)
  cancelChk()
}

const showDeleteModal = (item) => {
  waitingDeleteObj.value = item
  deleteModal.value = true
}

const cancelChk = () => { // 삭제취소
  deleteModal.value = false
  waitingDeleteObj.value = {}
}

</script>
<style lang="scss" scoped>
.container, .no-flex-container {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;
}
.no-flex-container{
  margin-top: 20%;

}

.content-repeat-area{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  gap: 2rem;
  grid-gap: 2rem;
}

.container-header{
  display: flex;
  justify-content: space-between;
  height: 4rem;
  margin-bottom: 2rem;

  .add-new-button{
    padding-right: 0.5rem;
    text-align:left;

    button {
      margin:0 auto;
      height: 100%;
      width:fit-content;
      padding: 0.3rem 0.5rem;
      border: none;
      border-radius: 5px 5px 5px;
      min-width: 100px;
      &:hover {
        background-color: whitesmoke;
        color: black;
      }
    }
  }
}

.add-new-paper-area {
  margin-top: 2rem;

  a{
    color: black;
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
}

.paper-objects-items {
  position: relative;
  width: 370px;
  min-height: 30rem;
  border: 1px solid grey;
  border-radius: 1.5rem;

  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  .paper-modal-vue{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    font-weight: bold;
    margin-top: 0.6rem;
    margin-right: 0.6rem;
    background-color: rgb(255, 78, 78);
    color: white;
    text-align: center;
    border-radius: 1rem 1rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
  opacity: 1;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 400px) {
  .container {
    width: 100%;
  }

  .content-repeat-area{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

</style>
