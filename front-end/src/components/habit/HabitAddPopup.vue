<template>
    <div class="popup-contatiner">
        <div class="contents">
            <input type="text" placeholder="제목을 입력하세요. ex)물 1L 마시기" />
            <textarea placeholder="간단히 메모하세요."></textarea>
            <button class="submit-btn">등록</button>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss">
.popup-contatiner {
    position: absolute;
    display: flex;
    right: -290px;
    width: 300px;
    height: 230px;
    bottom: 62px;
    border: solid 5px rgb(192, 192, 192);
    border-radius: 21px;
    border-bottom-left-radius: unset;
    background-color: white;
    padding: 23px;
    display: flex;
    color: darkgray;
    z-index: 1000;
}

input::placeholder {
  color: darkgray;
}

textarea::placeholder {
  color: darkgray;
}

.contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
    color: darkgray;

    input {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        height: 55px;
        color: darkgray;
        margin-bottom: 5px;
        padding-left: 15px;
        font-size: 12px;
        width: 100%;
    }

    textarea {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        color: darkgray;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        height: 100px;
        margin-bottom: 5px;
        padding: 10px;
        padding-left: 15px;
        font-size: 12px;
        width: 100%;
    }

    .submit-btn {
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        color: darkgray;
        height: 35px;
        width:50px;
        margin-top:5px;
    }
}
</style>
