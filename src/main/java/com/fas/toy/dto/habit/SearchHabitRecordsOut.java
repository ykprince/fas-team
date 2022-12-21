package com.fas.toy.dto.habit;

import lombok.Data;

@Data
public class SearchHabitRecordsOut {
    private String habitId;
    private String date;
    private String icon;
    private String startDate; // 이번주 시작일
    private String lastDate; // 이번주 종료일
}
