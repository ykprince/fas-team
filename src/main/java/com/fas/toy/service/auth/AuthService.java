package com.fas.toy.service.auth;

import java.util.List;

import com.fas.toy.dto.auth.SearchKakaoAuthIn;
import com.fas.toy.dto.auth.SearchKakaoAuthOut;

public interface AuthService {
  public abstract List<SearchKakaoAuthOut> searchKakaoAuths(SearchKakaoAuthIn skai);
}
