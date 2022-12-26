package com.fas.toy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.rollingpaper.SearchLetterIn;
import com.fas.toy.dto.rollingpaper.SearchLetterOut;
import com.fas.toy.dto.rollingpaper.SearchRollingpaperOut;
import com.fas.toy.service.rollingpaper.RPService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/rp")
public class RPController {
  @Autowired
  RPService rpService;
  
  @PostMapping("/getRollingpapers")
  public List<SearchRollingpaperOut> searchRollingpapers() {
    int id2 = 2; //세션값 가져오기
    return rpService.searchRollingpapers(id2);
  }

  @ResponseBody
  @PostMapping("/getLetters")
  public List<SearchLetterOut> searchLetters(@RequestBody SearchLetterIn searchLetterIn) {
    return rpService.searchLetters(searchLetterIn.getRSeq());
  }
}
