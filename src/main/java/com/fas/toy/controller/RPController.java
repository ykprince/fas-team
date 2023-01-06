package com.fas.toy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.rollingpaper.AddNewLetterIn;
import com.fas.toy.dto.rollingpaper.AddNewPaperIn;
import com.fas.toy.dto.rollingpaper.DeletePaperIn;
import com.fas.toy.dto.rollingpaper.MixLettersUid;
import com.fas.toy.dto.rollingpaper.SearchLetterIn;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchOnePaperOut;
import com.fas.toy.dto.rollingpaper.SearchPaperTitleIn;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;
import com.fas.toy.service.rollingpaper.RPService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/rp")
public class RPController {
  @Autowired
  RPService rpService;
  
  @ResponseBody
  @PostMapping("/getRollingpapers")
  public List<SearchRollingpaperOut> searchRollingpapers(@RequestBody int uid) {
    return rpService.searchRollingpapers(uid);
  }

  @ResponseBody
  @PostMapping("/searchOnePaper")
  public List<SearchOnePaperOut> searchOnePaper(@RequestBody int id) {
    return rpService.searchOnePaper(id);
  }

  @ResponseBody
  @PostMapping("/getLetters")
  public MixLettersUid searchLetters(@RequestBody SearchLetterIn searchLetterIn) {
    return rpService.searchLetters(searchLetterIn.getRSeq());
  }

  @ResponseBody
  @PostMapping("/searchUpdateTitle")
  public int searchPaperTitle(@RequestBody SearchPaperTitleIn searchPaperTitleIn) {
    return rpService.searchPaperTitle(searchPaperTitleIn);
  }

  @ResponseBody
  @PostMapping("/deletePaper")
  public int deletePaper(@RequestBody DeletePaperIn deletePaper) {
    return rpService.deletePaper(deletePaper.getRSeq());
  }

  @ResponseBody
  @PostMapping("/addNewPaper")
  public int addNewPaper(@RequestBody AddNewPaperIn addNewPaperin) {
    return rpService.addNewPaper(addNewPaperin);
  }

  @ResponseBody
  @PostMapping("/addNewLetter")
  public int addNewLetter(@RequestBody AddNewLetterIn addNewLetterIn) {
    return rpService.addNewLetter(addNewLetterIn);
  }
}
