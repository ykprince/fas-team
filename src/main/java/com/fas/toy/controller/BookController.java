package com.fas.toy.controller;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dao.TestDao;
import com.fas.toy.dto.TestDto;
import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.service.TestH2Service;
import com.fas.toy.service.TestH2ServiceImpl;
import com.fas.toy.service.book.BookGetherService;

import java.util.logging.Logger;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    TestDao dao;

    @Autowired
    SqlSessionTemplate session;

    @Autowired
    BookGetherService service2;



    final private static Logger LOG = Logger.getGlobal();
    public static final String SECURED_TEXT = "Hello from the secured resource!";

    @PostMapping("/insert")
    public String insertBookGethering(@RequestBody BookGetherDto dto) {
        System.out.println("::::::::::::::::::::::::::::::::::::::::::::::");
        System.out.println(dto);
        int result = service2.insertBookGether(dto);
        return result > 0 ? "등록 성공" : "문제가 발생";
    }
}
