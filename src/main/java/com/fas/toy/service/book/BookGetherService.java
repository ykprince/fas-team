package com.fas.toy.service.book;

import java.util.List;

import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;
import com.fas.toy.dto.book.SearchBookGetherListOut;

public interface BookGetherService {
    public abstract int insertBookGether(BookGetherDto bgDto);
    public abstract List<BookGetherDto> seachBookGetherList(SearchBookGetherListIn dto);
}
