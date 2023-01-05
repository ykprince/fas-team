<template lang="">
  <div class="container" :class="props.bgColor">
    <div class="top-image">
      <topImage></topImage>
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
          <button type="button" @click="searchMyLetter">내가 쓴 글 찾기</button>
        </div>
        <div>
          <input type="text" placeholder="작성자를 검색해보세요" autofocus v-model="searchingName" @keyup="searchName">
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="container-content-area">
      <MasonryWall :items="letters" :ssr-columns="1" :column-width="250" :gap="10" v-if="letters.length > 0">
        <template #default="{item}">
          <div class="repeat-area" :class="item.lstyle">
            <!--작성자-->
            <span class="writer">
              <strong class="writer-strong writer-link" :style="{'color':item.lstyle}">{{item.lwriter}}</strong>
              님께서
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
        <button class="btn " type="button" @click="showOthers" @touchstart="showOthers">지인들에게 페이지를 알려줄래요</button>
      </div>
    </div>

  </div>
</template>
<script setup>
import MasonryWall from '@yeger/vue-masonry-wall'
import { useStore } from 'vuex'
import { defineProps, computed, ref } from 'vue'
import TopImage from '../TopImage.vue'
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

const searchName = () => {
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

const showOthers = async () => {
  store.dispatch('auth/shareRPLink', { id: props.id })
}

const searchMyLetter = () => {
  // 1. Logincheck.
  // 2. Search 'one' => info of this account
  console.log('logincheck, search one')
}
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
}
.top-image{
  max-width: 500px;
  display: block;
  margin: 0 auto;
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
