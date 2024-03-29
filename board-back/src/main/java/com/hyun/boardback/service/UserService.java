package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;
import com.hyun.boardback.dto.response.user.GetUserResponseDto;

public interface UserService {
    
    ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email);
    ResponseEntity<? super GetUserResponseDto> getUser(String email);
}
