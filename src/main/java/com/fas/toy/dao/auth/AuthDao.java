package com.fas.toy.dao.auth;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.auth.SearchIdIn;
import com.fas.toy.dto.auth.SearchIdOut;
import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;

@Mapper
public interface AuthDao {
  int searchKakaoAuths(SearchKakaoAuthIn skai);
  List<SearchIdOut> searchId(SearchIdIn sii); 
  List<SearchIdOut> searchIdPw(SearchIdIn sii);
  int registWithKakao(SearchKakaoAuthIn skai);
  
  List<SearchKakaoAuthOut> searchIdWithKakao(SearchKakaoAuthIn skai);
}