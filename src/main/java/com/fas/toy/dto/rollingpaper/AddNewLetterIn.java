package com.fas.toy.dto.rollingpaper;

import lombok.Data;

@Data
public class AddNewLetterIn {
  private int rSeq;
  private int lwriterUid;
  private String lWriter;
  private String lContent;
  private Boolean lHiddenYn;
  private String lStyle;
  private String lReleaseAt;
  private String lCreatedAt;
}
