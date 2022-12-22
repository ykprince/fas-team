package com.fas.toy.dto.book;

import java.util.List;

import lombok.Data;

@Data
public class SearchBookGetherListOut {
    private List<BookGetherDto> bgdtoList;
}
