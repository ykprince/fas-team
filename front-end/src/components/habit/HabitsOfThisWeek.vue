<template>
    <div class="day-box">
        <div class="each-day" v-for="(day, index) in theRecord" :key="index">
            <div class="day">{{ day.day }}</div>
            <div class="icon" :class="day.icon?day.icon:'defaultIcon'"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
  },
  computed: {
    ...mapState('habit', [
      'theRecord'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/habit.scss';
.day-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border: solid 1px #e1e1e1;
    border-radius: 3px;
    box-shadow: 0px 1px 2px #e1e1e1;

    .each-day {
        width: 70px;
        border-right: 1px solid #e1e1e1;

        &:last-child {
            border: none;
        }

        .day {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
        }

        .icon {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            &::after {
                font-size: 2px !important;
            }
        }

        .defaultIcon::after {
            font-family: bootstrap-icons;
            content: '\F287';
            font-size: 2px;
            color: #f3f3f3;
        }
    }
}
</style>
