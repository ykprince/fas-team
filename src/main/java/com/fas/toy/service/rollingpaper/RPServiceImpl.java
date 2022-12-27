package com.fas.toy.service.rollingpaper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.rollingpaper.RPDao;
import com.fas.toy.dto.rollingpaper.AddNewLetterIn;
import com.fas.toy.dto.rollingpaper.AddNewPaperIn;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchOnePaperOut;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleIn;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleOut;
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

  @Override
  public int searchPaperTitle(SearchPaperTitleIn searchPaperTitleIn) {
    SearchPaperTitleOut searchPaperTitleOuts = RPDao.searchPaperTitle(searchPaperTitleIn);
    int rCount = searchPaperTitleOuts.getRCount();

    if (rCount == 0) {
      try {
        RPDao.updatePaperTitle(searchPaperTitleIn);
        return 201; // 정상 동작 (타이틀 수정 완료)

      } catch (Exception e) { 
        return 101; //업데이트 오류
      }

    } else { //이미 중복되는 값이 있을 경우
      return 100;
    }
  }

  @Override
  public int deletePaper(int rSeq) {
    int result = 0;
    try {
      int res = RPDao.deletePaper(rSeq);
      System.out.println(res);
      
      if (res > 0) {
        result = 200; // 삭제 성공
      } else {
        result = 101; // 삭제 실패
      }
    } catch (Exception e) {
      result = 100;   // 에러 발생
    }
    return result;
  }

  @Override
  public int addNewPaper(AddNewPaperIn addNewPaperIn) {
    return RPDao.addNewPaper(addNewPaperIn);
  }

  @Override
  public int addNewLetter(AddNewLetterIn addNewLetterIn) {
    return RPDao.addNewLetter(addNewLetterIn);
  }

  @Override
  public List<SearchOnePaperOut> searchOnePaper(String id) {
    return RPDao.searchOnePaper(id);
  }
}
