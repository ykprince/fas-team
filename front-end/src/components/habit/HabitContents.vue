<template>
    <div>
        <div class="content">
            <div class="icon-box">
                <div v-for="(icon, index) in habitIcons" :key="index" :class="icon">
                    {{ icon }}
                </div>
            </div>
            {{ theHabit.habitId }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('habit', [
      'theHabit',
      'habitIcons'
    ])
  },
  created () {
    console.log('왓하하하')
    console.log(this.habitIcons)
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    background-color: #f3f3f3;
    height: 400px;
    margin-left: 20px;
    padding-top: 30px;
    padding-left: 30px;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: darkgray;
    flex-direction: column;
    align-items: baseline;
}
</style>
