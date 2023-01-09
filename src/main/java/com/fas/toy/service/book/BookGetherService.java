package com.fas.toy.service.book;

import java.util.List;

import com.fas.toy.dto.book.BookGetherDto;
import com.fas.toy.dto.book.MemoDto;
import com.fas.toy.dto.book.SearchBookGetherListIn;
import com.fas.toy.dto.book.SearchMemoIn;

public interface BookGetherService {
    public abstract int insertBookGether(BookGetherDto bgDto);
    public abstract List<BookGetherDto> seachBookGetherList(SearchBookGetherListIn dto);
    public abstract int delBookGethersS(Integer idxs[]);

    public abstract int insertMemo(MemoDto mDto);
    public abstract List<MemoDto> searchMemo(SearchMemoIn dto);
}
