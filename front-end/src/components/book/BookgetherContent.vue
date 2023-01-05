<template>
    <div class="content-area">
        <!-- 상단  -->
        <div class="content-top">
            <div>
                <img :src="getherContent.thumbnail"/>
            </div>
            <div class="content-info">
                <div>
                    <h3>{{ getherContent.title }}</h3>
                </div>
                <div class="info-span">
                    <span>{{ getherContent.contents }}</span>
                </div>
                <div class="go-url">
                    <button type="button" class="btn btn-link" @click="openURL(getherContent.url)">자세히 보러 가기</button>
                </div>
            </div>
        </div>
        <!--// 상단  -->
        <!-- 중단 -->

        <!-- // 중단 -->
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info-tab-pane" type="button" role="tab" aria-controls="info-tab-pane" aria-selected="true">독서정보</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="memo-tab" data-bs-toggle="tab" data-bs-target="#memo-tab-pane" type="button" role="tab" aria-controls="memo-tab-pane" aria-selected="false">메모</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabindex="0">
                    <div v-if="getherContent.type === 1">
                        <!-- 독서기간 -->
                        <div>
                            <div>{{ getherContent.staDt }}</div>
                            <div>{{ getherContent.endDt }}</div>
                        </div>
                        <!-- // 독서기간 -->
                        <!-- 평점 -->
                        <div>
                            <div>{{ getherContent.rate }}</div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                    <div v-else-if="getherContent.type === 2">
                        <!-- 독서기간 -->
                        <div>
                            <div>{{ getherContent.staDt }}</div>
                        </div>
                        <!-- // 독서기간 -->
                        <!-- 독서량 -->
                        <div>
                            <div>{{ getherContent.readPage }}</div>
                            <div></div>
                        </div>
                        <!-- // 독서량 -->
                        <!-- 평점 -->
                        <div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                    <div v-else-if="getherContent.type === 3">
                        <!-- 평점 -->
                        <div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                </div>
                <div class="tab-pane fade" id="memo-tab-pane" role="tabpanel" aria-labelledby="memo-tab" tabindex="0">
                    <div class="memo-area">

                        <div class="memo-item">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                            <div class="memo-page">해당 쪽수</div>
                            <div class="memo-content">메모 내용</div>
                            <div class="memo-date">메모 작성 일시</div>
                        </div>
                        <div class="memo-item">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                            <div class="memo-page">해당 쪽수</div>
                            <div class="memo-content"></div>
                            <div class="memo-date">메모 작성 일시</div>
                        </div>
                    </div>
                    <div class="memo-submit-form">
                        <div class="memo-submit-top">
                            <!-- 책 쪽수 받아지면 맥스랭스 해당 책 쪽수로 -->
                            <textarea class="memo-input" rows="3" max="500" min="0" step="1"></textarea>
                        </div>
                        <div  class="memo-submit-bottom">
                            <div class="page-input" >
                                <span>메모 쪽수</span>
                                <input type="number" min="0" max="500">
                            </div>
                            <div class="btn-input" >
                                <button >작성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 -->

        <!-- // 하단 -->
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
  },
  watch: {
  },
  computed: {
    ...mapState('bookGether', [
      'getherContent'
    ])
  },
  methods: {
    openURL (url) {
      window.open(url)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.content-area {
 border: 5px dotted aliceblue;
 padding: 10px;
 text-align: left;
    .content-top {
        display: flex;
        margin-bottom: 10px;
        .content-info{
            margin-left: 5%;

            .info-span {
                margin-top: 5%;
            }
        }
    }
}

.nav-item {
    width: 50%;

    button {
        width: 100%;
    }
}

.tab-content {
    .tab-pane {
        margin: 10px 2% 10px 2%;
        height: 300px;
        text-align: center;
        padding: 2px;
        .memo-item {
            border: 1px dotted aquamarine;
            border-radius: 5px;
            margin-top: 4px;
            .memo-page {
                height: 20px;
                text-align: left;
            }
            .memo-content {
            }
            .memo-date {
                height: 20px;
                text-align: right;
            }
        }
    }
    .memo-submit-form {
        width: 100%;
        display: flex;
        .memo-submit-top {
            width: 80%;
            .memo-input {
                width: 100%;
            }
        }
        .memo-submit-bottom {
            width: 20%;
            display: block;
            text-align: left;
            .page-input {
                width: 100%;
                padding-left: 5%;
                span {
                    width: 70%;
                    margin-right: 5%;
                }
                input {
                    width: 30%;
                }
            }
            .btn-input {
                width: 100%;
                padding: 5%;
                button {
                }
            }
        }
    }
}
.memo-area {
    height: 80%;
}

.go-url {
    text-align: right;
    margin-top: 5px;
}
</style>
