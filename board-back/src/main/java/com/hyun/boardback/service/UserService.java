package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.request.user.PatchNicknameRequestDto;
import com.hyun.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;
import com.hyun.boardback.dto.response.user.GetUserResponseDto;
import com.hyun.boardback.dto.response.user.PatchNicknameResponseDto;
import com.hyun.boardback.dto.response.user.PatchProfileImageResponseDto;

public interface UserService {
    
    ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email);
    ResponseEntity<? super GetUserResponseDto> getUser(String email);
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
}
