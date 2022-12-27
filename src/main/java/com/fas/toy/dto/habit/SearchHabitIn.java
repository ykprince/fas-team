package com.fas.toy.dto.habit;

import lombok.Data;

@Data
public class SearchHabitIn {
    private int uid; // 사용자 아이디
    private int habitId; // 습관 아이디
    private String startDate; // 이번주 첫날
    private String endDate;   // 이번주 마지막날
}
