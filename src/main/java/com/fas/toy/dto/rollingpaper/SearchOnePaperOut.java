package com.fas.toy.dto.rollingpaper;

import lombok.Data;

@Data
public class SearchOnePaperOut {
  private int rSeq;
  private int uid;
  private String rTitle;
  private String rContent;
  private String rStyle;
  private String rExpiredAt;
  private String rcreatedAt;
  private String rUpdatedAt;
}
