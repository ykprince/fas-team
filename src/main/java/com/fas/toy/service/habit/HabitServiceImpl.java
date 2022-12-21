package com.fas.toy.service.habit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.habit.HabitDao;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;

@Service
public class HabitServiceImpl implements HabitService {

    @Autowired
    public
    HabitDao HabitDao;

    @Override
    public List<SearchHabitOut> searchHabits(int id) {
        return HabitDao.searchHabits(id);
    }

    @Override
    public SearchHabitOut searchHabitByHabitId(SearchHabitIn habit) {
        return HabitDao.searchHabitByHabitId(habit);
    }

    @Override
    public List<SearchHabitRecordsOut> searchHabitRecords(SearchHabitIn habit) {
        return HabitDao.searchHabitRecords(habit);
    }
}