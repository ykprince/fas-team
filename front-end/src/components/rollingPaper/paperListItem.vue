<template>
  <div class="container" :style="{'background-color':props.rpItem.rstyle}" @click="viewOneItem" >
    <div class="d-flex flex-column content-wrap" >
      <div @click.stop="" v-if="!updateItemYn" >
        <h2 @click="updateItemYn = !updateItemYn" >
          {{ props.rpItem.rtitle}}
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </h2>
      </div>

      <div v-else class="update-area" @click.stop="">
        <input type="text" v-model="updateTitleText" @keyup.enter="updateTitleChk" maxlength="24" >
        <button type="button" @click="updateTitleChk">변경</button>
        <button type="button" @click="updateItemYn = !updateItemYn">취소</button>
        <br />
        <p class="color-red" v-if="titleChk===true">중복되는 롤링페이퍼가 존재합니다.</p>
      </div>

      <div class="context-left-area"></div>
    </div>

    <span class="paper-close-btn" @click.stop="" @click="rmThispaper(props.rpItem)">X</span>

    <div class="paper-count-area">
      <p>현재 <strong :style="{'color':props.rpItem.rstyle}">{{ props.rpItem.listCount }}</strong>개의 글이 작성되어져있어요!</p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { defineProps, defineEmits, ref, computed } from 'vue'
import { useStore } from 'vuex'
const emits = defineEmits(['showDeleteModal'])
const props = defineProps({
  rpItem: {
    Type: Object,
    default: {}
  }
})
const store = useStore()
const titleChk = computed(() => store.state.rollingPaper.searchResult)
const updateItemYn = ref(false)
const updateTitleText = ref(props.rpItem.rtitle)

const rmThispaper = (item) => {
  emits('showDeleteModal', item)
}

const updateTitleChk = async () => {
  if (!updateTitleText.value.length > 0) {
    return false
  } else {
    const param = { rSeq: props.rpItem.rseq, rTitle: updateTitleText.value }
    await store.dispatch('checkAndUpdateTitle', param)

    if (titleChk.value === false) {
      updateItemYn.value = false
    } else {
      updateItemYn.value = true
    }
  }
}

const router = useRouter()
const viewOneItem = () => {
  router.push({ name: 'viewRollingpaper', params: { id: props.rpItem.rseq, bgColor: props.rpItem.rstyle, rTitle: props.rpItem.rtitle } })
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width:100%;
  height:100%;
  color: white;

  &:hover {
    cursor:pointer;
  }

  h2 {
    margin: 0 auto;
    &:hover {
      cursor: pointer;
    }
  }
  .content-wrap{
    width:100%;
    text-align: center;

    .context-left-area {
      flex: 1;

      &:hover{
        cursor: pointer;
      }
    }
  }
  .update-area {
    width: 100%;
    margin: 0 auto;
    text-align: center;

    input{
      text-align: center;
      padding: 0.5rem;
    }
    button {
      padding: 0.3rem 0.5rem;
      background: inherit;
      color: whitesmoke;
      border:none;
      &:hover {
        text-decoration: underline;
      }
    }
    .color-red {
      color: tomato;
      text-align: center;
      width:100%;
      padding-top: 0.2rem;
    }
  }
  .paper-close-btn {
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

  .paper-count-area{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    margin-bottom: 1rem;

    p{
      width: fit-content;
      background-color: rgb(255, 255, 255, 0.8);
      padding: 0.5rem 2rem;
      color: black;
      border-radius: 5px 5px 5px;
      margin: 0 auto;

      strong{
        font-size: 1.6rem;
      }
    }
  }
}
</style>
