package com.fas.toy.dto.habit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchHabitRecordsOut {
    private String habitId;
    private String date;
    private String icon;

    public String getHabitId() {
        return this.habitId;
    }

    public void setHabitId(String habitId) {
        this.habitId = habitId;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getIcon() {
        return this.icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "{" +
            " habitId='" + getHabitId() + "'" +
            ", date='" + getDate() + "'" +
            ", icon='" + getIcon() + "'" +
            "}";
    }


}
