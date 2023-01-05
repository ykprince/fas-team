package com.fas.toy.controller;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;
import com.fas.toy.service.book.BookGetherService;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    SqlSessionTemplate session;

    @Autowired
    BookGetherService service2;

    public static final String SECURED_TEXT = "Hello from the secured resource!";

    @PostMapping("/insert")
    public String insertBookGethering(@RequestBody BookGetherDto dto) {
        return service2.insertBookGether(dto) > 0 ? "등록 성공" : "문제가 발생";
    }

    @PostMapping("/selectBookGetherList")
    public List<BookGetherDto> selectBookGetherList(@RequestBody SearchBookGetherListIn dto) {
        return service2.seachBookGetherList(dto);
    }

    @PostMapping("/deleteBook")
    public String delBookGethers(@RequestBody Integer[] idxs) {
        return service2.delBookGethersS(idxs) > 0 ? "성공" : "실패";
    }
}
