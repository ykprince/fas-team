package com.fas.toy.dao.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;

@Mapper
public interface BookGetherDao {
    int insertBookGether(BookGetherDto bgDto);
    List<BookGetherDto> selectBookGetherList(SearchBookGetherListIn sbglI);
    int deleteBookGether(Integer idxs[]);
}
