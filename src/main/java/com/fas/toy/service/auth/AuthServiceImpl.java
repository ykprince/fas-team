package com.fas.toy.service.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.auth.AuthDao;
import com.fas.toy.dto.auth.MyPagePwChkIn;
import com.fas.toy.dto.auth.RegistIn;
import com.fas.toy.dto.auth.SearchIdIn;
import com.fas.toy.dto.auth.SearchIdOut;
import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;

@Service
public class AuthServiceImpl implements AuthService {
  @Autowired
  public AuthDao authDao;

  @Override
  public List<SearchKakaoAuthOut> searchKakaoAuths(SearchKakaoAuthIn skai) {
    int rsCnt = authDao.searchKakaoAuths(skai); // 회원정보 조회 체크

    if (rsCnt == 0) { // 회원가입시 다른 서비스를 호출해야할 것으로 생각
      try {
        authDao.registWithKakao(skai);
      } catch (Exception e) {
        System.out.println(e);
      }
    }

    List<SearchKakaoAuthOut> skao = authDao.searchIdWithKakao(skai);
    return skao;
  }

  @Override // id 존재여부 체크
  public List<SearchIdOut> searchId(SearchIdIn sii) {
    return authDao.searchId(sii);
  }

  @Override
  public List<SearchIdOut> searchIdPw(SearchIdIn sii) {
    return authDao.searchIdPw(sii);
  }

  @Override
  public String chkIdAvailable(SearchIdIn sii) {
    System.out.println(sii);
    String rt;
    int cnt = authDao.chkIdAvailable(sii);
    if (cnt > 0) {
      rt = "exist";
    } else {
      rt = "available";
    }

    return rt;
  }

  @Override
  public int registNewId(RegistIn sii) {
    return authDao.registNewId(sii);
  }

  @Override
  public int myPagePwChk(MyPagePwChkIn mppci) {
    String dbPassword = authDao.getPasswordWithId(mppci); // 비밀번호 가져오기
    System.out.println("dbpassword::: " + dbPassword);
    System.out.println("mppci.getPassword() ::: " + mppci.getPassword());
    // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(15)

    // if (matches(dbPassword, mppci.getPassword())) {
    // return 1;
    // } else {
    // return 0;
    // }
    return 0;
  }

  @Override
  public String getPasswordWithId(MyPagePwChkIn mppci) {
    return authDao.getPasswordWithId(mppci);
  }

}
