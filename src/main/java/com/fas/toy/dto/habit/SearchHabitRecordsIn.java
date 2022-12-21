package com.fas.toy.dto.habit;

import java.sql.Date;

import lombok.Data;

@Data
public class SearchHabitRecordsIn {
    private int uid;        // 사용자 아이디
    private String habitId; // 습관 아이디
}
