package com.fas.toy.dao.rollingpaper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;

@Mapper
public interface RPDao {
  List<SearchRollingpaperOut> searchRollingpapers(int id);
  List<SearchLetterOut> searchLetters(int r_seq);
}
