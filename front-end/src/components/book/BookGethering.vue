<template>
  <span v-if="gether.type == '1'" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
  <span class="visually-hidden">New alerts</span>
</span>
<img class="thumbImg" src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1164422%3Ftimestamp%3D20221107224040">
<div class="gInfo">
  {{ gether.sta_dt }}
</div>
<figcaption>
  <h3>{{gether.title}}</h3>
  <p>읽은 날짜, 진행도, 등등 타입별로 다른 내용으로 미리보기 제공하기</p>
</figcaption>
</template>

<script>
export default {
  props: {
    gether: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
