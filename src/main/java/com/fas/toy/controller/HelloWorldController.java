package com.fas.toy.controller;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    final private static Logger LOG = Logger.getGlobal();
    public static final String SECURED_TEXT = "Hello from the secured resource!";

    @GetMapping("/hello")
    public String helloWorld() {
        System.out.println("asdasd");
        return "Hello";
    }
}
