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
    int rsCnt =  authDao.searchKakaoAuths(skai); // 회원정보 조회 체크

    if (rsCnt == 0) { //회원가입시 다른 서비스를 호출해야할 것으로 생각
      try {
        authDao.registWithKakao(skai);
      } catch (Exception e) {
        System.out.println(e);
      }
    } 

    List<SearchKakaoAuthOut> skao = authDao.searchIdWithKakao(skai);
    return skao;

    
  }
}
