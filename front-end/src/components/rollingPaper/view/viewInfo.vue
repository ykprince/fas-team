<template lang="">
  <div class="container" :class="props.bgColor">
    <div class="top-image">
      <topImage class="chirsmas-tree-img"></topImage>
      <div class="share-area">
        <div class="cover-share-area">
          <p v-show="clickShareLinkStatus" class="link-copy-check-text">링크가 복사됐어요!</p>
          <img :src="SHARE_LINK" alt="링크로 공유하기" class="share-link" @click="shareLink"/>
          <img :src="KAKAO_SHARE" alt="카카오톡으로 공유하기" @click="KakaoShowOthers" @touchstart="KakaoShowOthers" class="kakao-share-link">
        </div>
      </div>
    </div>

    <div class="container-header">
      <div class="title-section">
        <h3 :class="props.bgColor"><strong>{{props.rTitle}}</strong></h3>
        &nbsp;
        <span>에는 총&nbsp;</span>
        <h3 :class="props.bgColor"><strong>{{letters.length}}</strong></h3>
        <span>&nbsp;개의 쪽지가 있어요</span>
      </div>

      <div class="search-section">
        <div>
          <button v-if="!myPaperCheck" type="button" @click="searchMyLetter">내가 쓴 글 찾기</button>
        </div>
        <div class="right-position">
          <input type="text" placeholder="작성자를 검색해보세요" autofocus v-model="searchingName" @keyup="searchName">
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="container-content-area">
      <MasonryWall :items="letters" :ssr-columns="1" :column-width="250" :gap="10" v-if="letters.length > 0">
        <template #default="{item}">
          <div v-if="myPaperCheck" class="repeat-area" :class="item.lstyle">
            <!--작성자-->
            <span class="writer">
              <strong class="writer-strong writer-link" :style="{'color':item.lstyle}">{{item.lwriter}}</strong>
              님이
              <strong class="writer-strong" :style="[{'display' : item.lhiddenYn === true ? 'inline' : 'none'}, {'color':item.lstyle}]">몰래</strong>
              써주셨어요.
            </span>

            <!--내용-->
            <div class="content">
              <span class="content-span">{{item.lcontent}}</span>
            </div>
          </div>

        </template>
      </MasonryWall>
      <div v-else class="contents-none">
        <h1>쪽지가 없어요😥</h1>
        <button class="btn " type="button" @click="KakaoShowOthers" @touchstart="KakaoShowOthers">지인들에게 페이지를 알려줄래요</button>
      </div>
    </div>

  </div>
</template>
<script setup>
import MasonryWall from '@yeger/vue-masonry-wall'
import { useStore } from 'vuex'
import { defineProps, computed, ref, onMounted } from 'vue'
import TopImage from '../TopImage.vue'
import useClipboard from 'vue-clipboard3'
import { STIE_ADDRESS } from '@/store/ShareLink.js'

const { toClipboard } = useClipboard()
const KAKAO_SHARE = require('@/assets/kakaotalk_sharing_btn_small.png')
const SHARE_LINK = require('@/assets/share-link.png')
const props = defineProps({
  id: {
    Type: Number,
    default: 0
  },
  bgColor: {
    Type: String,
    default: ''
  },
  rTitle: {
    Type: String,
    default: ''
  }
})
const store = useStore()
const letters = computed(() => store.state.rollingPaper.letters)
store.dispatch('getLetters', props.id)

const searchingName = ref('')
const clickShareLinkStatus = ref(false)
const userAuth = computed(() => store.state.auth.auth) // 현재 로그인된 정보
const ownerId = computed(() => store.state.rollingPaper.lettersOwnerUid) // 롤링페이퍼 주인 uid
const myPaperCheck = computed(() => ownerId.value === userAuth.value.uid)
const kakaoInitialized = computed(() => store.state.auth.kakaoInitialized)
const searchName = () => { // 닉네임으로 검색
  if (searchingName.value === '') {
    store.dispatch('searchNameInPaperRestore')
  } else {
    const obj = {
      paperid: props.id,
      name: searchingName.value
    }
    store.dispatch('searchNameInPaper', obj)
  }
}

const fncInit = async () => { // 기본호출함수
  await store.dispatch('auth/kakaoInit')
}

const KakaoShowOthers = async () => { // 카카오로 공유
  if (kakaoInitialized.value === false) {
    await store.dispatch('auth/kakaoInit')
  }
  await store.dispatch('auth/shareRPLink', { id: props.id })
}

const searchMyLetter = async () => { // 내가 쓴 letter 검색
  await store.dispatch('searchMyLetterInPaper', userAuth.value.uid)
}

const shareLink = async () => { // 링크공유 클릭 이벤트
  const url = STIE_ADDRESS + `new-letter?id=${props.id}`
  try {
    await toClipboard(url)
    clickShareLinkStatus.value = true
    setTimeout(() => {
      clickShareLinkStatus.value = false
    }, 2500)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fncInit() // 기본호출함수
})
</script>

<style lang="scss" scoped>
.share-area{
  width: fit-content;
  height: 30px;
  position: absolute;
  right: 0;
  display: block;
  .cover-share-area{
    display: flex;
  height: 30px;
    gap: 5px;
  }
  button {
    width: 30px;
  }

  img {
    border-radius: 15px 15px 15px;
    background: white;
    box-shadow: 1px 1px 1px rgb(87, 87, 87);
    opacity: 0.9;
    &:hover {
      cursor: pointer;
    }
  }
  .link-copy-check-text{
    line-height: 30px;
    height: 100%;
    vertical-align: middle;
  }

}
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 2rem;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.2rem;
}
.top-image{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  .chirsmas-tree-img{
    margin: 0 auto;
    max-width :500px;
  }
}
.container-header {
  width: 100%;
  height: 3rem;
  padding: 0 auto;
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  justify-content: center;

  .title-section{
    width: 100%;
    font-size: 2rem;
    h3 {
      display: inline-block;
      font-size: 2.5rem;
      background-color: whitesmoke;
      padding: 5px;
      border-radius: 5px 5px 5px;
    }
  }

  .search-section{
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div {
      button {
        padding: 0.5rem;
        border:none;
        background-color: inherit;
        color: white;
        transition: 0.25s;

        &:hover {
          background-color: white;
          color: darkgreen;
        }
      }

      input {
        padding: 0.5rem;
        border:none;
        border-radius: 0.5rem;
      }
    }
  }
}

.divider{
  border-bottom: 1px solid white;
  width: 90%;
  margin: 0 auto 4rem auto;
}

.container-content-area {
  width: 100%;
  padding: 2rem;

  .repeat-area {
    box-shadow: 5px 5px 5px rgb(39, 37, 37, 0.3);
    padding: 2rem;
    border-radius: 15px;

    .writer{
      display: inline-block;
      margin-top: 1rem;
      margin-bottom: 2rem;
      .writer-strong{
        padding: 5px;
        background-color: whitesmoke;
        border-radius: 5px 5px 5px;
      }
    }

    .writer-link{
      &:hover {
        cursor: pointer;
      }
    }

    .content {
      background: whitesmoke;
      color: black;
      padding: 1rem;
      border-radius: 5px 5px 5px;
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

.tomato {
  background-color: tomato;
  strong{
    color: tomato;
  }
}
.royalblue {
  background-color: royalblue;
  strong {
    color: royalblue;
  }
}
.seagreen {
  background-color:seagreen;
  strong{
    color:seagreen;
  }
}
.darkviolet {
  background-color: darkviolet;
  strong{
    color:darkviolet;
  }
}
.darkslategrey {
  background-color: darkslategrey;
  strong{
    color:darkslategrey;
  }
}

</style>
