package com.fas.toy.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fas.toy.dto.habit.SearchHabitIn;
import com.fas.toy.dto.habit.SearchHabitOut;
import com.fas.toy.dto.habit.SearchHabitRecordsIn;
import com.fas.toy.dto.habit.SearchHabitRecordsOut;
import com.fas.toy.service.habit.HabitService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RequestMapping("/habit")
@RestController
public class HabitController {

    @Autowired
    HabitService HabitService;

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

        SearchHabitOut habitResult = HabitService.searchHabitByHabitId(habit);

        if (habit.getStartDate() != null) {
            List<SearchHabitRecordsOut> test = HabitService.searchHabitRecords(habit);
            System.out.println(test);
            habitResult.setHabitRecords(test);
        }

        System.out.println(habitResult);
        return habitResult;
    }

}
