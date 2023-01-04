<template>
  <div>
    <div>
        <Spinner v-if="loading" />
    </div>
    <div class="container">
      <div class="left-section col-md-4">
        <HabitList class="habit-list" />
      </div>
      <HabitContents class="col-md-8 habit-content" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitList from '../components/habit/HabitList.vue'
import HabitContents from '../components/habit/HabitContents.vue'
import Spinner from '../components/habit/Spinner.vue'

export default {
  components: {
    HabitList,
    HabitContents,
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
    background-color: #f3f3f3 !important;;
    color: darkgray !important;

    &::after {
      color: darkgray !important;
    }
  }

  .left-section {
    position: relative;
    height: 400px;

    .habit-list {
      display: inline-block;
      height: 100%;
      min-width: 300px;
      -ms-overflow-style: none;

      &:hover>.unclicked {
        background-color: white;
        color: rgb(192, 192, 192);
        box-shadow: 0px 0px 8px -3px #8a8a8a;
      }
    }

    .habit-list::-webkit-scrollbar{
      display:none;
    }

    .habit-content{
      display: inline-block;
    }
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
