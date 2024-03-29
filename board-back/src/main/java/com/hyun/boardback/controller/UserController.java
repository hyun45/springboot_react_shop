package com.hyun.boardback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;
import com.hyun.boardback.dto.response.user.GetUserResponseDto;
import com.hyun.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(@AuthenticationPrincipal String email){
        
        ResponseEntity<? super GetLoginUserResponseDto> response = userService.getLoginUser(email);
        return response;
    }

    @GetMapping("/{email}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email){

        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(email);
        return response;
    }
}
