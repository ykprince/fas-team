package com.fas.toy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fas.toy.dto.TestDto;


public interface TestH2Service {
    public abstract List<TestDto> userList();
}
