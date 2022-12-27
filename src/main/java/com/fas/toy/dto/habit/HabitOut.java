package com.fas.toy.dto.habit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HabitOut {
    private int habitId;
    private String title;
    private String description;
}
