package com.fas.toy.service.habit;

import java.util.HashMap;
import java.util.List;
import com.fas.toy.dto.habit.HabitIn;
import com.fas.toy.dto.habit.HabitOut;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;
import com.fas.toy.dto.habit.UpdateHabitIn;

public interface HabitService {
    public abstract List<SearchHabitOut> searchHabits(int id);
    public abstract SearchHabitOut searchHabitByHabitId(SearchHabitIn habit);
    public abstract List<SearchHabitRecordsOut> searchHabitRecords(SearchHabitIn habit);
    public abstract SearchHabitOut insertHabit(HabitIn habit);
    public abstract SearchHabitOut updateHabit(UpdateHabitIn habit);
    public abstract HashMap<String, Boolean> deleteHabit(HabitIn habit);
    public abstract List<SearchHabitRecordsOut> searchHabitRecordsOfTheYear(HabitIn habit);
}
