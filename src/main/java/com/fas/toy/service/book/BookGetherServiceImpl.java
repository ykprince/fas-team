package com.fas.toy.service.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.book.BookGetherDao;
import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;
import com.fas.toy.dto.book.SearchBookGetherListOut;

@Service
public class BookGetherServiceImpl implements BookGetherService{

    @Autowired
    BookGetherDao bgDao;

    @Override
    public int insertBookGether(BookGetherDto bgDto) {
        bgDto.setEnd_dt("9999-01-01");
        return bgDao.insertBookGether(bgDto);
    }

    @Override
    public List<BookGetherDto> seachBookGetherList(SearchBookGetherListIn dto) {
        dto.setUid("0");
        return bgDao.selectBookGetherList(dto);
    }
}
