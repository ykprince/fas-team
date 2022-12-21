<template lang="">
  <div class="container" :style="{'background-color': rollingpaperObj.paperStyle}">
    <div class="container-header" v-if="listCount < 0">
      <h3>{{rollingpaperObj.paperName}}&nbsp;</h3>
      <span>에는 총</span>
      <h3>&nbsp;{{rollingpaperObj.paperList.length}}&nbsp;</h3>
      <span>개의 쪽지가 있어요</span>
    </div>

    <div class="container-content-area">
      <div class="outer-list" v-if="listCount < 0">
        <div class="container-repeat" v-for="(item, index) in rollingpaperObj.paperList" :key="index">
          <!--작성자-->
          <span class="writer">
            <strong class="writer-strong" :style="{'color':item.style}">{{item.writer}}</strong>
            님께서
            <strong class="writer-strong" :style="[{'display' : item.hiddenYn === true ? 'inline' : 'none'}, {'color':item.style}]">몰래</strong>
            써주셨어요.
          </span>

          <!--내용-->
          <div class="content">
            <span class="content-span">{{item.content}}</span>
          </div>

        </div>
      </div>
      <div v-else class="contents-none">
        <h1>아직 날아온 쪽지가 없어요😥</h1>
        <button class="btn " type="button" @click="showOthers">지인들에게 페이지를 알려줄래요</button>
      </div>
    </div>
</div>
</template>
<script setup>
import { useStore } from 'vuex'
import { defineProps, computed } from 'vue'

const props = defineProps({
  id: {
    Type: Number,
    default: 0
  }
})
const store = useStore()
const rollingpaperList = computed(() => store.state.rollingPaper.all)
store.dispatch('getAllPapers')

const rollingpaperObj = computed(() => store.state.rollingPaper.one)
store.dispatch('getOnePaper', props.id)
const listCount = computed(() => store.state.rollingPaper.one.paperList.length)

const showOthers = () => {
  // 카카오톡 공유하기 추가하기
  // https://developers.kakao.com/docs/latest/ko/message/js-link
}

console.log(rollingpaperList)
console.log(listCount)

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 2rem;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.2rem;

  .container-header {
    width: 100%;
    height: 3rem;
    padding: 0 auto;
    margin-top: 1rem;
    margin-bottom: 2rem;
    h3 {
      display: inline-block;
      font-size: 2rem;
    }
  }
  .container-content-area{
    height:100%;
    margin-top: 3rem;
    .outer-list{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
      margin: 0;

      .content-list{
        padding: 0;
      }

      .container-repeat {
        display: inline-block;
        margin: 0;
        width: 100%;
        transition: all .5s;
      }
      .writer {
        display: inline-block;
        margin-bottom: 3rem;
        .writer-strong{
          font-size: 1.4rem;
          background: white;
          padding: 0.3rem;
          border-radius: 0.5rem;
        }
      }
      .content {
        max-height: 20rem;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 1rem;
        padding: 3rem;
        margin: 0 auto;
        margin-bottom: 3rem;
        background-color: rgb(255, 253, 250);
        color: rgb(49, 49, 49);
        white-space: wrap;

        &::-webkit-scrollbar{
          width: 0.5rem;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgb(194, 194, 194);
          opacity: 0.3;
          border-radius: 1rem;
        }
      }

    }
  }

  .contents-none{
    width:100%;
    height:100%;
    min-height: 30rem;
    max-height:70rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      margin-top: 3rem;
      background: white;
        color: black;
      font-size: 2rem;

      &:hover {
        background-color: inherit;
        color: white;
        text-decoration: underline;
      }
    }
  }
}

</style>
