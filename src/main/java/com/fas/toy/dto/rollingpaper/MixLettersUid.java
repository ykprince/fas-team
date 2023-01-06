package com.fas.toy.dto.rollingpaper;

import java.util.List;

import lombok.Data;

@Data
public class MixLettersUid {
  private List<SearchLetterOut> slo;
  private int lwriterUid;
}
