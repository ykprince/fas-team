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
import com.fas.toy.service.TestH2Service;
import com.fas.toy.service.TestH2ServiceImpl;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @Autowired
    TestDao dao;

    @Autowired
	SqlSessionTemplate session;

    @Autowired
    TestH2Service service2;

    final private static Logger LOG = Logger.getGlobal();
    public static final String SECURED_TEXT = "Hello from the secured resource!";

    @GetMapping("/hello")
    public String helloWorld() {
        System.out.println("asdasd");
        return "Hello";
    }

    @GetMapping("/testH2")
    public List<TestDto> searchDb() {
        return service2.userList();
    }
}
