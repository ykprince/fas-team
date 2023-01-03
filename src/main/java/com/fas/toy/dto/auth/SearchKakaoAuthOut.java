package com.fas.toy.dto.auth;

import lombok.Data;

@Data
public class SearchKakaoAuthOut {
  private int uid;
  private String userId;
  private String kakaoId;
  private String name;
  private String nickname;
  // private String password; //비밀번호 암호화?
  private String phone;
  private String birth;
  private String profileImage;
}
