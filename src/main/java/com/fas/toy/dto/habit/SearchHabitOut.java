package com.fas.toy.dto.habit;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchHabitOut {
    private int uid; // 사용자 아이디
    private String habitId; // 습관 아이디
    private String title;
    private String content;
    private String icon;
    private String date; // 등록일
	private List<SearchHabitRecordsOut> habitRecords;
}

