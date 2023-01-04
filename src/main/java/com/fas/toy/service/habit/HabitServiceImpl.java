package com.fas.toy.service.habit;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fas.toy.dao.habit.HabitDao;
import com.fas.toy.dto.habit.HabitIn;
import com.fas.toy.dto.habit.HabitOut;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;
import com.fas.toy.dto.habit.UpdateHabitIn;

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
        SearchHabitOut habitResult = HabitDao.searchHabitByHabitId(habit);

        if (habit.getStartDate() != null) {
            List<SearchHabitRecordsOut> habitRecords = HabitDao.searchHabitRecords(habit);
            habitResult.setHabitRecords(habitRecords);
        }

        return habitResult;
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
            sHabitIn.setUid(habit.getUid());

            sHabitOut = HabitDao.searchHabitByHabitId(sHabitIn);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sHabitOut;
    }

    @Override
    public SearchHabitOut updateHabit(UpdateHabitIn habit) {
        LOGGER.info("-------UpdateHabitIn-------");
        LOGGER.info(habit.toString());
        
        SearchHabitOut sHabitOut = new SearchHabitOut();

        try {
            HabitDao.updateHabit(habit);

            SearchHabitIn sHabitIn = new SearchHabitIn();
            sHabitIn.setHabitId(habit.getHabitId());
            sHabitIn.setUid(habit.getUid());
            
            sHabitOut = HabitDao.searchHabitByHabitId(sHabitIn);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sHabitOut;
    }

    @Override
    public HashMap<String, Boolean> deleteHabit(HabitIn habit) {
        HashMap<String, Boolean> result = new HashMap<>();

        try {
            HabitDao.deleteHabit(habit);
            result.put("SUCCESS", true);
        } catch (Exception e) {
            result.put("SUCCESS", false);
        }
        
        return result;
    }

    @Override
    public List<SearchHabitRecordsOut> searchHabitRecordsOfTheYear(HabitIn habit) {
        return HabitDao.searchHabitRecordsOfTheYear(habit);
    }
}