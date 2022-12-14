package com.fas.toy.dto.habit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchHabitRecordsOut {
    private int habitId;
    private String date;
    private String icon;
}
