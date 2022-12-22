<template>
  <div>
    <div>
        <Spinner v-if="loading" />
    </div>
    <div class="container">
      <div class="left-section col-md-4">
        <HabitList class="habit-list" />
        <HabitAddButton @openPop="openPop" :onClickAddBtn=clicked />
        <div>
          <HabitAddPopup class="habitPop" v-if="clicked" @afterAdded="afterAdded"/>
        </div>
      </div>
      <HabitContents class="col-md-8 habit-content" />
      <div class="dim" v-if="clicked"></div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitList from '../components/habit/HabitList.vue'
import HabitContents from '../components/habit/HabitContents.vue'
import HabitAddButton from '../components/habit/HabitAddButton.vue'
import HabitAddPopup from '../components/habit/HabitAddPopup.vue'
import Spinner from '../components/habit/Spinner.vue'

export default {
  components: {
    HabitList,
    HabitContents,
    HabitAddButton,
    HabitAddPopup,
    Spinner
  },
  computed: {
    ...mapState('habit', [
      'habits',
      'loading'
    ])
  },
  data () {
    return {
      clicked: false
    }
  },
  created () {
    // uid 추후 삭제
    this.$store.dispatch('habit/searchHabits', {
      uid: 1
    })
  },
  methods: {
    openPop (value) {
      this.clicked = value
    },
    afterAdded (habit) {
      // 팝업 닫기
      this.openPop(false)

      // 스크롤 하단으로 내리기
      const list = document.getElementById('habitItemList')
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/habit.scss';

.container {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;

  .disabled > * * {
    background-color: #f3f3f3;
    color: darkgray !important;

    // & :disabled {
    //   background-color: #f3f3f3;
    //   color: darkgray !important;
    // }

    &::after {
      color: darkgray !important;
    }
  }

  .left-section {
    position: relative;

    &:hover>.unclicked {
      background-color: white;
      color: rgb(192, 192, 192);
      box-shadow: 0px 0px 8px -3px #8a8a8a;
    }

    .habit-list {
      display: inline-block;
      height: 400px;
      min-width: 300px;
      -ms-overflow-style: none;
    }

    .habit-list::-webkit-scrollbar{
      display:none;
    }

    .habit-content{
      display: inline-block;
    }
  }

  .dim {
    position:fixed;
    top:0;
    left:0;
    right: 0;
    display: flex;
    background-color: #00000071;
    z-index: 999;
    width:100%;
    height:100%;
  }

}

// @include media-breakpoint-down(xl) {
//   .poster {
//     width: 300px;
//     height: 300px*3/2;
//     margin-right: 40px;
//   }
// }
// @include media-breakpoint-down(lg) {
//   display: block;
//   .poster {
//     margin-bottom: 40px;
//   }
// }
// @include media-breakpoint-down(md) {
//   .specs {
//     .title {
//       font-size: 50px;
//     }
//     .ratings {
//       .rating-wrap {
//         display: block;
//         .rating {
//           margin-top: 10px;
//         }
//       }
//     }
//   }
// }

</style>
