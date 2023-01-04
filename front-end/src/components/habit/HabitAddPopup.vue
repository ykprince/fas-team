<template>
    <div class="popup-contatiner">
        <div class="contents">
            <input type="text" placeholder="제목을 입력하세요. ex)물 1L 마시기" :class="{'error': titleIsNull}" v-model="title"/>
            <textarea placeholder="간단히 메모하세요." :class="{'error': contentIsNull}" v-model="content"></textarea>
            <button class="submit-btn" @click="addHabit">등록</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: '',
      titleIsNull: false,
      contentIsNull: false
    }
  },
  computed: {
    ...mapState('habit', [
      'habits',
      'theHabit',
      'openAddHabitPop'
    ])
  },
  methods: {
    async addHabit () {
      if (this.isNull(this.title)) {
        this.titleIsNull = true
        return
      } else if (this.isNull(this.content)) {
        this.titleIsNull = false
        this.contentIsNull = true
        return
      } else {
        this.titleIsNull = false
        this.contentIsNull = false
      }

      const theHabit = {
        title: this.title,
        content: this.content,
        icon: ''
      }

      await this.$store.dispatch('habit/addHabit', theHabit)

      // 스크롤 하단으로 내리기
      const list = document.getElementById('habitItemList')
      list.scrollTop = list.scrollHeight
    },
    isNull (val) {
      if (val === '' || typeof val === 'undefined' || val === null) return true
      else return false
    }
  }
}
</script>

<style lang="scss">

.error {
  outline: 1px solid $red !important;
  transition: 0.5s ease all;
}

.popup-contatiner {
    position: absolute;
    display: flex;
    right: -328px;
    bottom: 75px;
    width: 335px;
    height: 245px;
    border: solid 5px rgb(192, 192, 192);
    border-radius: 21px;
    border-bottom-left-radius: unset;
    background-color: white;
    padding: 23px;
    display: flex;
    color: darkgray;
    z-index: 1000;
}

.contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
    color: darkgray;

    input::placeholder {
        color: darkgray;
    }

    textarea::placeholder {
        color: darkgray;
    }

    input {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        height: 55px;
        color: darkgray;
        margin-bottom: 5px;
        padding-left: 15px;
        font-size: 13px;
        width: 100%;
    }

    textarea {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        color: darkgray;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        height: 100px;
        margin-bottom: 5px;
        padding: 10px;
        padding-left: 15px;
        font-size: 13px;
        width: 100%;
        resize: none;
    }

    .submit-btn {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        color: darkgray;
        height: 35px;
        width:50px;
        margin-top:5px;
        font-size: 12px;
    }
}
</style>
