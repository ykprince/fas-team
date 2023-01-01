package com.fas.toy.service.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.auth.AuthDao;
import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;

@Service
public class AuthServiceImpl implements AuthService{
  @Autowired
  public AuthDao authDao;
   
  @Override
  public List<SearchKakaoAuthOut> searchKakaoAuths(SearchKakaoAuthIn skai){
    List<SearchKakaoAuthOut> skao =  authDao.searchKakaoAuths(skai);
    if (skao == null) { //회원가입시 다른 서비스를 호출해야할 것으로 생각
      // int resultType = authDao.registWithKakao(skai);
      // return resultType;
      // 회원가입 내용
      return null;
    } else {
      return null;

      // 로그인 처리
    }
  }
}
