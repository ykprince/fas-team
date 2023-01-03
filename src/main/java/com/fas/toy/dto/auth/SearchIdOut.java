package com.fas.toy.dto.auth;

import lombok.Data;

@Data
public class SearchIdOut {
  private int uid;
  private String userId;
  // private String kakaoId; //카카오 : search-kakao-auth-out
  private String name;
  private String nickname;
  // private String password; //비밀번호 암호화?
  private String phone;
  private String birth;
  private String profileImage;
  private int resultCode;
}
