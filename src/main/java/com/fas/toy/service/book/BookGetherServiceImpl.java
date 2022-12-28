package com.fas.toy.service.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.book.BookGetherDao;
import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;

@Service
public class BookGetherServiceImpl implements BookGetherService{

    @Autowired
    BookGetherDao bgDao;

    @Override
    public int insertBookGether(BookGetherDto bgDto) {
        if(bgDto.getType() == 1){

        }else if(bgDto.getType() == 2){
            bgDto.setEndDt(null);
        }else{
            bgDto.setStaDt(null);
            bgDto.setEndDt(null);
        }

        return bgDao.insertBookGether(bgDto);
    }

    @Override
    public List<BookGetherDto> seachBookGetherList(SearchBookGetherListIn dto) {
        dto.setUid("0");
        return bgDao.selectBookGetherList(dto);
    }

    @Override
    public int delBookGethersS(Integer[] idxs) {
        return bgDao.deleteBookGether(idxs);
    }
}
