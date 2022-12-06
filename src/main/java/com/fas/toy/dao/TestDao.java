package com.fas.toy.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;

import com.fas.toy.dto.TestDto;

public interface TestDao {
    public abstract List<TestDto> searchH2(SqlSessionTemplate session);
}
