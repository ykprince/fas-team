package com.fas.toy.dto.book;

import lombok.Data;

@Data
public class BookGetherDto {
    private String bg_idx;         // 모임 번호
    private int uid;            // 등록자 고유번호
    private int type;           // 독후감 타입 ( 1: 읽은 책, 2: 읽고 있는 책, 3: 읽을 책)
    private String sta_dt;      // 독서 시작 일자
    private String end_dt;      // 독서 종료 일자
    private int rate;           // 읽은 후 평점
    private int rate_ex;        // 읽기 전 평점
    private String comment_ex;  // 읽기 전 기대문구
    private int read_page;      // 읽은 쪽수
    private String bg_color;    // 배경 컬러

    //책 정보
    private String authors;     // 작가
    private String contents;    // 소개
    private String datetime;    // 출간일
    private String isbn;        //isbn
    private int price;       //가격
    private String publisher;   //출판사;
    private String thumbnail;   //대표이미지
    private String title;       //제목
    private String translators; //번역
    private String url;         //상세
}