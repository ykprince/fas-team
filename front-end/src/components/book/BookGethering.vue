<template>
  <div>
    <div :id="gether.bgIdx" class=""></div>
    <!-- 등록일 3일 이내면 보여주기 -->
  <!-- <span v-if="gether.regDate" class="badge bg-secondary">New</span> -->
    <div>
      <img class="thumbImg" :src="gether.thumbnail">
      <div class="gInfo">
        {{ gether.staDt }}
      </div>
      <!-- <figcaption>
        <h3>{{gether.title}}</h3>
        <p>읽은 날짜, 진행도, 등등 타입별로 다른 내용으로 미리보기 제공하기</p>
      </figcaption> -->
    </div>
  </div>
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
