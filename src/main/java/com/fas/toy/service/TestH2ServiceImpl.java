package com.fas.toy.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.TestDao;
import com.fas.toy.dto.TestDto;

@Service
public class TestH2ServiceImpl implements TestH2Service{

    @Autowired
	TestDao dao;

	@Autowired
	SqlSessionTemplate session;

    @Override
    public List<TestDto> userList() {
        System.out.println("asdasdasdsa");
        return dao.searchH2(session);
    }

}
