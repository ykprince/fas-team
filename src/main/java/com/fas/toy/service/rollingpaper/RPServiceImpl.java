package com.fas.toy.service.rollingpaper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.rollingpaper.RPDao;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;

@Service
public class RPServiceImpl implements RPService {
  @Autowired
  RPDao RPDao;

  @Override
  public List<SearchRollingpaperOut> searchRollingpapers(int id) {
    return RPDao.searchRollingpapers(id);
  }

  @Override
  public List<SearchLetterOut> searchLetters(int r_seq) {
    return RPDao.searchLetters(r_seq);
  }
}
