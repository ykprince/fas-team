package com.fas.toy.dto.habit;

import lombok.Data;

@Data
public class SearchHabitIn {
    private int uid; // 사용자 아이디
    private String habitId; // 습관 아이디
    private String startDate; // 이번주 첫날
    private String endDate;   // 이번주 마지막날

	public String getStartDate() {
		return this.startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return this.endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

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

	@Override
	public String toString() {
		return "{" +
			" uid='" + uid + "'" +
			", habitId='" + habitId + "'" +
			", startDate='" + startDate + "'" +
			", endDate='" + endDate + "'" +
			"}";
	}
}
