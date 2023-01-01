package com.fas.toy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;
import com.fas.toy.service.auth.AuthService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  AuthService AuthService;

  @ResponseBody
  @PostMapping("/kakaoLoginCheck")
  public List<SearchKakaoAuthOut> searchKakaoAuthOuts(SearchKakaoAuthIn skai) {
    System.out.println(skai);
      return AuthService.searchKakaoAuths(skai);
  }
  
}
