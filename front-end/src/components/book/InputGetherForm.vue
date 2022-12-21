<template>
  <div>
    <div class="row">
      <div class="typeBox col order-first" @click="formChange(1)">
        읽은 책
        <br>
        <span>
          다 읽은 책이에요
        </span>
      </div>
      <div class="typeBox col" @click="formChange(2)">
        읽고 있는 책
        <br>
        <span>
          열심히 읽고 있어요
        </span>
      </div>
      <div class="typeBox col order-last" @click="formChange(3)">
        읽고 싶은 책
        <br>
        <span>
          찜 해두고 싶어요
        </span>
      </div>
    </div>
    <div>
      <T1 v-if="formType === 1"></T1>
      <T2 v-else-if="formType === 2"></T2>
      <T3 v-else-if="formType === 3"></T3>
      <div>
        <label for="inputPassword5" class="form-label">배경 테마 색상</label>
        <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color" >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import T1 from './FormType1.vue'
import T2 from './FormType2.vue'
import T3 from './FormType3.vue'
export default {
  components: {
    T1,
    T2,
    T3
  },
  data () {
    return {
      formType: 1
    }
  },
  watch: {
    formType (newVal) {
      console.log('newVal:::::::::::::::::::::::::::::::', newVal)
      this.formType = newVal
      this.$store.commit('bookGether/resetTheGether', newVal)
    }
  },
  props: {
    theBook: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState('bookGether', [
      'theGether'
    ])
  },
  methods: {
    formChange (num) {
      console.log(this.theGether)
      this.formType = num
    }
  },
  mounted () {
    this.$store.commit('bookGether/resetTheGether', 1)
  }
}
</script>

<style scoped>

.typeBox {
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
}
</style>
