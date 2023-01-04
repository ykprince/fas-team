<template>
    <div class="text-center section">
        <v-calendar
        class="custom-calendar max-w-full"
        :attributes="attributes"
        :minDate="minDate"
        :maxDate="maxDate"
        disable-page-swipe
        is-expanded
        >
        <template v-slot:day-content="{ day, attributes }">
            <div class="day-box flex flex-col h-full z-10 overflow-hidden">
                <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                <div class="flex-grow overflow-y-auto overflow-x-auto">
                    <p
                        v-for="(attr, index) in attributes"
                        :key="index"
                        :class="attr.customData.class"
                    >
                    </p>
                </div>
            </div>
        </template>
        </v-calendar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import 'v-calendar/dist/style.css'
export default {
  data () {
    return {
      masks: {
        weekdays: 'WWW',
        minDate: '',
        maxDate: ''
      }
    }
  },
  computed: {
    ...mapState('habit', [
      'attributes',
      'today'
    ])
  },
  created () {
    const curDate = new Date()
    this.minDate = new Date(curDate.getFullYear(), 0, 1)
    this.maxDate = new Date(new Date(curDate.getFullYear(), 12, 0))
  }
}
</script>

<style lang="scss">
$day-border: solid 1px #e1e1e1;
$day-border-highlight: solid 1px #e1e1e1;
$day-width: 80px;
$day-height: 80px;
$weekday-bg: white;
$weekday-border: 1px solid #eaeaea;

p {
    margin-bottom:0px !important;
}

.vc-nav-title{
    color: gray;

    &:focus {
        border-color: gray;
    }

    &:hover {
        background-color: #efefef;
        color: gray;
        box-shadow: none;
    }
}

.vc-nav-arrow:hover {
    background-color: #efefef;
}

.vc-nav-popover-container {
    color: gray;
    font-size: 12px;
    font-weight: 100;
    background-color: #ffffff;
    border: 1px solid;
    border-color: #e1e1e1;
    border-radius: 3px;
    padding: 4px;

    .vc-nav-item:hover {
        background-color: #efefef;
        color: gray;
        box-shadow: none;
    }

    .vc-nav-item.is-current {
        color: gray;
        font-weight: 600;
        border-color: #efefef;
    }

    .vc-nav-item.is-active {
        color: #747474;
        background: #efefef;
        font-weight: bold;
        box-shadow: none;
    }

    .vc-nav-item:focus {
        border-color: gray;
    }
}

.scrollbar {
  width: 0px;
}
.scrollbar-track {
  display: none;
}

.day-label {
  display: block;
  left: 5px;
  top: 5px;
  position: absolute;
}

.day-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.custom-calendar.vc-container {
  border-radius: 3px;
  width: 100%;
  color: gray !important;
  border: $day-border;

  .vc-arrows-container {
    padding: 4px;
  }

  .vc-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    color: gray !important;
  }

  .vc-header {
    background-color: white;
    padding: 10px 0;
  }
  .vc-weeks {
    padding: 0;

    &:first-child {
      border-left: none !important;
    }
  }
  .vc-weekday {
    background-color: $weekday-bg;
    border-bottom: $weekday-border;
    border-top: $weekday-border;

    text-align: center;
    color: gray;
    font-size: 13px;
    font-weight: 500;
    line-height: 27px;
    user-select: none;
  }

  .vc-day {
    text-align: left;
    min-height: $day-height;
    min-width: $day-width;
    overflow: auto;
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #f5f5f5;
    }
    &:not(.on-bottom) {
      border-bottom: $day-border;
      &.weekday-1 {
        border-bottom: $day-border-highlight;
      }
    }
    &:not(.on-right) {
      border-right: $day-border;
    }
  }
  .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
