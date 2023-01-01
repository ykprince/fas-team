package com.fas.toy.dao.auth;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;

@Mapper
public interface AuthDao {
  List<SearchKakaoAuthOut> searchKakaoAuths(SearchKakaoAuthIn skai);
  int registWithKakao(SearchKakaoAuthIn skai);
}
