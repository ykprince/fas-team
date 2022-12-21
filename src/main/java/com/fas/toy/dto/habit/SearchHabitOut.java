package com.fas.toy.dto.habit;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class SearchHabitOut {
    private int uid; // 사용자 아이디
    private String habitId; // 습관 아이디
    private String title;
    private String description;
    private String icon;
    private String date; // 등록일
	private List<SearchHabitRecordsOut> habitRecords;

	public int getUid() {
		return this.uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getHabitId() {
		return this.habitId;
	}

	public void setHabitId(String habitId) {
		this.habitId = habitId;
	}

	public List<SearchHabitRecordsOut> getHabitRecords() {
		return this.habitRecords;
	}

	public void setHabitRecords(List<SearchHabitRecordsOut> habitRecords) {
		this.habitRecords = habitRecords;
	}

}

