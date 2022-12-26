package com.fas.toy.service.rollingpaper;

import java.util.List;

import com.fas.toy.dto.rollingpaper.SearchLetterIn;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;

public interface RPService {
  public abstract List<SearchRollingpaperOut> searchRollingpapers(int id);
  public abstract List<SearchLetterOut> searchLetters(int rSeq);
}
