package com.fas.toy.dto.habit;

import lombok.Data;

@Data // ------> 20221227 내일은 여기부터 시작~
public class UpdateHabitIn {
    private int uid; // 사용자 아이디
    private String habitId; // 습관 아이디
    private String title;
    private String description;
    private String icon;
    private String today; // 오늘 날짜
}
