package com.fas.toy.service.habit;

import java.util.List;

import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;

public interface HabitService {
    public abstract List<SearchHabitOut> searchHabits(int id);
    public abstract SearchHabitOut searchHabitByHabitId(SearchHabitIn habit);
    public abstract List<SearchHabitRecordsOut> searchHabitRecords(SearchHabitIn habit);
}
