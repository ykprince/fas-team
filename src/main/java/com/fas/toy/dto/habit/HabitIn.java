package com.fas.toy.dto.habit;

import lombok.Data;

@Data
public class HabitIn {
    private int habitId;
    private int uid;
    private String title;
    private String content;
    private String icon;
    private String date;
}
