<template>
    <div class="week-box">
        <div class="each-day" v-for="week in weeks" :key="week">
            <div class="day">{{ week }}</div>
            <div class="icon habitIcon1-color"></div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      weeks: ['일', '월', '화', '수', '목', '금', '토']
    }
  }
}
</script>

<style lang="scss" scoped>
.icon::after {
    font-family: bootstrap-icons;
    content: '\F287';
    font-size: 2px;
    color: #f3f3f3;
}
.habitIcon1-color::after {
    color: $yellow;
}
.week-box {
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
        }
    }
}
</style>
