package com.fas.toy.controller;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.habit.HabitIn;
import com.fas.toy.dto.habit.HabitOut;
import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;
import com.fas.toy.dto.habit.UpdateHabitIn;
import com.fas.toy.service.habit.HabitService;
import com.fas.toy.service.habit.HabitServiceImpl;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RequestMapping("/habit")
@RestController
public class HabitController {

    @Autowired
    HabitService HabitService;
    
    private final Logger LOGGER = LoggerFactory.getLogger(HabitServiceImpl.class.getName());

    @GetMapping("/getHabits")
    public List<SearchHabitOut> searchHabits() {
        // 추후 세션 구현되면 세션값 받아서 셋팅
        int loginId = 1;
        return HabitService.searchHabits(loginId);
    }

    @GetMapping("/getHabitByHabitId")
    public SearchHabitOut searchHabitByHabitId(@RequestBody SearchHabitIn habit) {
        int loginId = 1; // 추후 세션 구현되면 세션값 받아서 셋팅
        habit.setUid(loginId);

        return HabitService.searchHabitByHabitId(habit);
    }

    @GetMapping("/addHabit")
    public SearchHabitOut insertHabit(@RequestBody HabitIn habit) {
        int loginId = 1; // 추후 세션 구현되면 세션값 받아서 셋팅
        habit.setUid(loginId);
        return HabitService.insertHabit(habit);
    }

    @PostMapping("/updateHabit")
    public SearchHabitOut updateHabit(@RequestBody UpdateHabitIn habit) {
        int loginId = 1; // 추후 세션 구현되면 세션값 받아서 셋팅
        habit.setUid(loginId);

        return HabitService.updateHabit(habit);
    }

    @PostMapping("/deleteHabit")
    public HashMap<String, Boolean> deleteHabit(@RequestBody HabitIn habit) {
        int loginId = 1; // 추후 세션 구현되면 세션값 받아서 셋팅
        habit.setUid(loginId);

        return HabitService.deleteHabit(habit);
    }

    @GetMapping("/searchHabitRecordsOfTheYear")
    public List<SearchHabitRecordsOut> searchHabitRecordsOfTheYear(@RequestBody HabitIn habit) {
        int loginId = 1; // 추후 세션 구현되면 세션값 받아서 셋팅
        habit.setUid(loginId);

        LOGGER.info("------------------------------");
        LOGGER.info(habit.toString());
        LOGGER.info("------------------------------");

        return HabitService.searchHabitRecordsOfTheYear(habit);
    }
}
