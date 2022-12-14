<template lang="">
  <div class="container">
    <div v-for="rpItem in rollingpaperObj" :key="rpItem" class="paper-objects-container">
      <h2>{{rpItem.paperName}}</h2>
      <span @click="rmThispaper(rpItem)">delete</span>
    </div>
  </div>
</template>
<script setup>
// store.js에서 개인정보-롤링페이퍼정보 수신
// 임시 데이터
const rollingpaperObj = [
  {
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    paperStyle: {}, // 스타일 설정
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writter: '김상훈',
        title: '안녕하세요. fasol에서 작성',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: {},
        hiddenYn: true
      },
      {
        writter: '이용근',
        title: '안녕하세요.',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: false
      },
      {
        writter: '홍샘이',
        title: '안녕하세요. 샘이에요',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: true
      }
    ]
  }
]

const rmThispaper = function (rpItem) {
  console.log(rpItem)
}
</script>
<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  padding: 2rem;
}
h2 {
  padding-top: 10%;
  text-align: center;
}
.paper-objects-container {
  width: 50%;
  border: 2px solid grey;
  border-radius: 1.5rem;
}

@media (max-width: 400px) {
  .container {
    width: 100%;
    max-width: 35rem;
  }
  .paper-objects-container {
    width: 50%;
  }
}
</style>
