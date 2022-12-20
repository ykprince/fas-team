<template>
        <div class="row">
            <div class="col-md-12 imgDiv">
                <img :src="theBook.thumbnail" class="img-fluid" alt="asd"/>
            </div>
            <div  class="col-md-12">
                <p style="font-size: 20px; font-weight: bold; margin-top: 40px;margin-bottom: 10px;">도서 기본 정보</p>
                <table class="table table-striped table-bordered">
                    <colgroup>
                    <col width="20%">
                    <col width="auto">
                    </colgroup>
                    <tr>
                        <th>
                            <label><strong>책소개</strong></label>
                        </th>
                        <td>
                            <!-- <input type="text" class="form-control" :value="theBook.contents" readonly> -->
                            <textarea class="form-control" id="exampleFormControlTextarea1" :value="theBook.contents" rows="3"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="bookName">
                                <strong>도서명</strong>
                            </label>
                        </th>
                        <td>
                            <input type="text" class="form-control" name="item_name"
                            readonly="readonly" id="bookName" placeholder="상품명 입력" required="required" :value="theBook.title">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="promotioncode">
                                <strong>그룹 공개 여부</strong>
                            </label>
                        </th>
                        <td>
                            <div class="form-check" data-toggle="buttons">
                                <label class="btn">
                                    <input type="radio" value="T" name="item_tf" checked>
                                    공개
                                </label>
                                <label class="btn">
                                    <input type="radio" value="F" name="item_tf">
                                    비공개
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="bookName"><strong>저자</strong></label>
                        </th>
                        <td>
                            <input type="text" class="form-control" :value="theBook.authors" readonly>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="bookName"><strong>옮긴이</strong></label>
                        </th>
                        <td>
                            <input type="text" class="form-control" :value="theBook.translators" readonly>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="bookName"><strong>출판사</strong></label>
                        </th>
                        <td>
                            <input type="text" class="form-control" :value="theBook.publisher" readonly>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
</template>

<script>
export default {
  props: {
    theBook: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.imgDiv {
    text-align: center;
}
</style>
