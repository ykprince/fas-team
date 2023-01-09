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
                    <button class="nav-link" id="memo-tab" data-bs-toggle="tab" data-bs-target="#memo-tab-pane" type="button" role="tab" aria-controls="memo-tab-pane" aria-selected="false" @click="getMemo">메모</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabindex="0">
                    <div v-if="getherContent.type === 1">
                        <!-- 독서기간 -->
                        <div>
                            <div>
                                <span>독서 기간</span>
                            </div>
                            <div>
                                <input class="form-control" type="date" id="endDt1" placeholder="종료일" v-model="getherContent.staDt" readonly>
                            </div>
                            <div>
                                <input class="form-control" type="date" id="endDt1" placeholder="종료일" v-model="getherContent.endDt" readonly>
                            </div>
                        </div>
                        <!-- // 독서기간 -->
                        <!-- 평점 -->
                        <div>
                            <div>
                                <span>평점</span>
                            </div>
                            <div>
                                {{ getherContent.rate }}
                                <div class="progress">
                                    <div  class="progress-bar bg-success sta-dt-div" role="progressbar" aria-label="Success example" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                    <div v-else-if="getherContent.type === 2">
                        <!-- 독서기간 -->
                        <div>
                            <div>
                                <span>독서 시작일</span>
                            </div>
                            <div>{{ getherContent.staDt }}</div>
                        </div>
                        <!-- // 독서기간 -->
                        <!-- 독서량 -->
                        <div>
                            <div>
                                <span>진행도</span>
                            </div>
                            <div>{{ getherContent.readPage }}</div>
                            <div></div>
                        </div>
                        <!-- // 독서량 -->
                        <!-- 평점 -->
                        <div>
                            <div>
                                <span>평점</span>
                            </div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                    <div v-else-if="getherContent.type === 3">
                        <!-- 평점 -->
                        <div>
                            <div>
                                <span>기대 평점</span>
                            </div>
                            <div>{{ getherContent.rateEx }}</div>
                        </div>
                        <!-- //평점 -->
                    </div>
                </div>
                <div class="tab-pane fade" id="memo-tab-pane" role="tabpanel" aria-labelledby="memo-tab" tabindex="0">
                    <div class="memo-area">
                        <div class="memo-item" v-for="memo in getherContent.memoList" :key="memo.memoIdx" >
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                            <div class="memo-page">{{ memo.memoPage }} P</div>
                            <div class="memo-content">{{ memo.memoContent }}</div>
                            <div class="memo-date">{{ memo.memoDate }}</div>
                        </div>
                    </div>
                    <div class="memo-submit-form">
                        <div class="memo-submit-top">
                            <!-- 책 쪽수 받아지면 맥스랭스 해당 책 쪽수로 -->
                            <textarea class="memo-input" rows="3" max="500" min="0" step="1" v-model="memoObj.memoContent"></textarea>
                        </div>
                        <div  class="memo-submit-bottom">
                            <div class="page-input" >
                                <span>메모 쪽수</span>
                                <input type="number" v-model="memoObj.memoPage" min="0" max="500">
                            </div>
                            <div class="btn-input" @click="insertMemo">
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
    return {
      memoObj: {
        memoContent: '',
        memoPage: 0,
        processType: 'insert'
      }
    }
  },
  watch: {
    getherContent () {
      document.getElementById('info-tab').click()
    }
  },
  computed: {
    ...mapState('bookGether', [
      'getherContent'
    ]),
    returnRate: function () {
      console.log(this.getherContent.rate + '%')
      return this.getherContent.rate + '%'
    }
  },
  methods: {
    openURL (url) {
      window.open(url)
    },
    insertMemo () {
      this.memoObj.processName = 'Memo'
      this.$store.dispatch('bookGether/frontController', this.memoObj).then(() => {
        // alert('(토스트로 바꾸기)')
        // this.$store.commit('bookGether/resetTheGether', '')
        // this.$emit('handler')
      })
    },
    getMemo () {
      this.$store.dispatch('bookGether/frontController', { bgIdx: this.getherContent.bgIdx, uid: '0', processType: 'select', processName: 'Memo' })
    }
  },
  mounted () {
    this.memoObj.bgIdx = this.getherContent.bgIdx
  }
}
</script>

<style lang="scss" scoped>
.content-area {
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
