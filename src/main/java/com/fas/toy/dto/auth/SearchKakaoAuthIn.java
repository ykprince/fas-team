package com.fas.toy.dto.auth;

import lombok.Data;

@Data
public class SearchKakaoAuthIn {
  private String kakaoId;
  private String email;
  private String nickName;
  private String profileImg;
  private String profileThumbnailImg;
  private String lastLoginAt;
}
