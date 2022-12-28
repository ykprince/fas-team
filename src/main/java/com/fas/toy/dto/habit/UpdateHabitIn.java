package com.fas.toy.dto.habit;

import lombok.Data;

@Data
public class UpdateHabitIn {
    private int uid;
    private int habitId; // 습관 아이디
    private String title;
    private String description;
    private String icon;
}
