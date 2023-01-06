package com.fas.toy.dto.rollingpaper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchLetterOut {
  private int lSeq;
  private int rSeq;
  private int uid;
  private String lWriter;
  private String lContent;
  private Boolean lHiddenYn;
  private String lStyle;
  private String lReleaseAt;
  private String lCreatedAt;
}
