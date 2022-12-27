package com.fas.toy.dao.habit;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.fas.toy.dto.habit.HabitIn;
import com.fas.toy.dto.habit.HabitOut;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;

@Mapper
public interface HabitDao {
    List<SearchHabitOut> searchHabits(int id);
    SearchHabitOut searchHabitByHabitId(SearchHabitIn habit);
    List<SearchHabitRecordsOut> searchHabitRecords(SearchHabitIn habit);
    int insertHabit(HabitIn habit);
}
