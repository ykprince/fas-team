package com.fas.toy.dao.rollingpaper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.rollingpaper.AddNewLetterIn;
import com.fas.toy.dto.rollingpaper.AddNewPaperIn;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchOnePaperOut;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleIn;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleOut;

@Mapper
public interface RPDao {
  List<SearchRollingpaperOut> searchRollingpapers(int id);
  List<SearchLetterOut> searchLetters(int r_seq);
  List<SearchOnePaperOut> searchOnePaper(int id);
  SearchPaperTitleOut searchPaperTitle(SearchPaperTitleIn searchPaperTitleIn);
  int updatePaperTitle(SearchPaperTitleIn searchPaperTitleIn);
  int deletePaper(int rSeq);
  int addNewPaper(AddNewPaperIn addNewPaperIn);
  int addNewLetter(AddNewLetterIn addNewLetterIn);
}
