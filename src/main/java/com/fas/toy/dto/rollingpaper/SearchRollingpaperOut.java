package com.fas.toy.dto.rollingpaper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchRollingpaperOut {
  private int rSeq;
  private int uid;
  private String rTitle;
  private String rContent;
  private String rStyle;
  private Boolean rHiddenYn;
  private String rExpiredAt;
  private String rCreatedAt;
  private String rUpdatedAt;
  private int listCount;
}
