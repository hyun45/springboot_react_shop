package com.hyun.boardback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyun.boardback.dto.request.auth.SignUpRequestDto;
import com.hyun.boardback.dto.request.auth.LoginRequestDto;
import com.hyun.boardback.dto.response.auth.SignUpResponseDto;
import com.hyun.boardback.dto.response.auth.LoginResponseDto;
import com.hyun.boardback.service.AuthService;

import javax.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    
    @PostMapping("/signUp")
    public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto requestBody){

        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<? super LoginResponseDto> login(@RequestBody @Valid LoginRequestDto requestBody){

        ResponseEntity<? super LoginResponseDto> response = authService.login(requestBody);
        return response;
    }
}
