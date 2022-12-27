package com.fas.toy.dto.rollingpaper;

import lombok.Data;

@Data
public class AddNewPaperIn {
  private int uid;
  private String rTitle;
  private String rContent;
  private String rStyle;
  private String rExpiredAt;
  private String rCreatedAt;
  private String rUpdatedAt;
}
