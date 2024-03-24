package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.request.auth.SignUpRequestDto;
import com.hyun.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
