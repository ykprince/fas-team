package com.fas.toy.service.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.book.BookGetherDao;
import com.fas.toy.dto.book.BookGetherDto;

@Service
public class BookGetherServiceImpl implements BookGetherService{

    @Autowired
    BookGetherDao bgDao;

    @Override
    public int insertBookGether(BookGetherDto bgDto) {
        return bgDao.insertBookGether(bgDto);
    }
}
