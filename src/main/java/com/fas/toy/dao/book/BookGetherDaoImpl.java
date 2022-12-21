package com.fas.toy.dao.book;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fas.toy.dto.book.BookGetherDto;

@Repository
public class BookGetherDaoImpl implements BookGetherDao{

    @Autowired
	SqlSessionTemplate session;

    @Override
    public int insertBookGether( BookGetherDto bgDto) {
        System.out.println("bgDto여기 디에이오야!!!!!!!!!!!!!");
        System.out.println(bgDto);
        return session.insert("BookGetherMapper.insertBookGether", bgDto);
    }
}
