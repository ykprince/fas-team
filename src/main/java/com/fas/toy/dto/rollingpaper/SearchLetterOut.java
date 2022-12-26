package com.fas.toy.dto.rollingpaper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchLetterOut {
  private int lSeq;
  private int rSeq;
  private String lWriter;
  private String lContent;
  private Boolean lHiddenYn;
  private String lStyle;
  private String lReleaseAt;
  private String lCreatedAt;
}
