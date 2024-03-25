package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;

public interface UserService {
    
    ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email);
}
