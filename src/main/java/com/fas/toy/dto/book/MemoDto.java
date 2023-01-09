package com.fas.toy.dto.book;

import lombok.Data;

@Data
public class MemoDto {
    private int bgIdx;         // 모임 번호
    private int memoIdx;         // 모임 번호
    private String uid;            // 등록자 고유번호
    private int memoPage;           // 독후감 타입 ( 1: 읽은 책, 2: 읽고 있는 책, 3: 읽을 책)
    private String memoContent;      // 독서 시작 일자
    private String memoDate;      // 독서 시작 일자
}