package com.fas.toy.service.rollingpaper;

import java.util.List;

import com.fas.toy.dto.rollingpaper.AddNewLetterIn;
import com.fas.toy.dto.rollingpaper.AddNewPaperIn;
import com.fas.toy.dto.rollingpaper.MixLettersUid;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchOnePaperOut;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleIn;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;

public interface RPService {
  public abstract List<SearchRollingpaperOut> searchRollingpapers(int id);
  public abstract MixLettersUid searchLetters(int rSeq);
  public abstract List<SearchOnePaperOut> searchOnePaper(int id);
  public abstract int searchPaperTitle(SearchPaperTitleIn searchPaperTitleIn);
  public abstract int deletePaper(int rSeq);
  public abstract int addNewPaper(AddNewPaperIn addNewPaperIn);
  public abstract int addNewLetter(AddNewLetterIn addNewLetter);
  
}
