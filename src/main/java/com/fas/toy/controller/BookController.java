package com.fas.toy.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.MemoDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;
import com.fas.toy.dto.book.SearchMemoIn;
import com.fas.toy.service.book.BookGetherService;
import com.fas.toy.service.book.BookGetherServiceImpl;


@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    SqlSessionTemplate session;

    @Autowired
    BookGetherService service2;


    private final Logger LOGGER = LoggerFactory.getLogger(BookGetherServiceImpl.class.getName());

    @PostMapping("/insertGether")
    public String insertBookGethering(@RequestBody BookGetherDto dto) {
        return service2.insertBookGether(dto) > 0 ? "등록 성공" : "문제가 발생";

    }

    @PostMapping("/selectGether")
    public List<BookGetherDto> selectBookGetherList(@RequestBody SearchBookGetherListIn dto) {
        LOGGER.info(dto.getUid());
        LOGGER.info(dto.getType());
        return service2.seachBookGetherList(dto);
    }

    @PostMapping("/deleteGether")
    public String delBookGethers(@RequestBody Integer[] idxs) {
        return service2.delBookGethersS(idxs) > 0 ? "성공" : "실패";
    }



    @PostMapping("/insertMemo")
    // public String insertMemoGethering(@RequestBody Object obj) {
    public String insertMemoGethering(@RequestBody MemoDto dto) {
        return service2.insertMemo(dto) > 0 ? "등록 성공" : "문제가 발생";
    }

    @PostMapping("/selectMemo")
    public List<MemoDto> selectMemoList(@RequestBody SearchMemoIn dto) {
        return service2.searchMemo(dto);
    }
}
