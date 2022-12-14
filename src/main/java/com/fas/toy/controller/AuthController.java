package com.fas.toy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.auth.RegistIn;
import com.fas.toy.dto.auth.SearchIdIn;
import com.fas.toy.dto.auth.SearchIdOut;
import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;
import com.fas.toy.dto.auth.MyPagePwChkIn;
import com.fas.toy.service.auth.AuthService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  AuthService AuthService;

  @ResponseBody
  @PostMapping("/myPagePwChk")
  public Integer myPagePwChk(MyPagePwChkIn mppci) {
    System.out.println(mppci);
    return AuthService.myPagePwChk(mppci);
  }

  @ResponseBody
  @PostMapping("/kakaoLoginCheck")
  public List<SearchKakaoAuthOut> searchKakaoAuthOuts(SearchKakaoAuthIn skai) {
    return AuthService.searchKakaoAuths(skai);
  }

  @ResponseBody
  @PostMapping("/idChk")
  public List<SearchIdOut> searchId(SearchIdIn sii) {
    return AuthService.searchId(sii);
  }

  @ResponseBody
  @PostMapping("/idPwChk")
  public List<SearchIdOut> searchIdPw(SearchIdIn sii) {
    return AuthService.searchIdPw(sii);
  }

  @ResponseBody
  @PostMapping("/chkIdAvailable")
  public String chkIdAvailable(SearchIdIn sii) {
    return AuthService.chkIdAvailable(sii);
  }

  @ResponseBody
  @PostMapping("/registNewId")
  public int registNewId(RegistIn sii) {
    return AuthService.registNewId(sii);
  }

}
