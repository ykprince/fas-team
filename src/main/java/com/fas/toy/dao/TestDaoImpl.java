package com.fas.toy.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.fas.toy.dto.TestDto;

@Repository
public class TestDaoImpl implements TestDao{

    @Override
    public List<TestDto> searchH2(SqlSessionTemplate session) {
        return session.selectList("TestMapper.searchTest");
    }

}
