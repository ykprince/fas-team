package com.fas.toy.dto.book;

import lombok.Data;

@Data
public class BookGetherDto {
    private int uid;
    private int type;
    private String sta_dt;
    private String end_dt;
    private int rate;
    private int rate_ex;
    private int read_page;
    private String bg_color;
}