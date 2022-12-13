package com.fas.toy.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fas.toy.dto.TestDto;

@Repository
public class TestDaoImpl implements TestDao{

    @Autowired
	SqlSessionTemplate session;

    @Override
    public List<TestDto> searchH2() {
        return session.selectList("TestMapper.searchTest");
    }

}
