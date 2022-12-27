package com.fas.toy.service.habit;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.habit.HabitDao;
import com.fas.toy.dto.habit.HabitIn;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;

@Service
public class HabitServiceImpl implements HabitService {

    @Autowired
    public
    HabitDao HabitDao;

    private final Logger LOGGER = LoggerFactory.getLogger(HabitServiceImpl.class.getName());

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

    @Override
    public SearchHabitOut insertHabit(HabitIn habit) {
        SearchHabitOut sHabitOut = new SearchHabitOut();

        try {
            HabitDao.insertHabit(habit);

            SearchHabitIn sHabitIn = new SearchHabitIn();
            sHabitIn.setHabitId(habit.getHabitId());
            sHabitIn.setUid(1); // 추후 세션값 받아서 셋팅

            LOGGER.info("------------------------------");
            LOGGER.info(Integer.toString(habit.getHabitId()));
            LOGGER.info("------------------------------");

            sHabitOut = HabitDao.searchHabitByHabitId(sHabitIn);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sHabitOut;
    }
}