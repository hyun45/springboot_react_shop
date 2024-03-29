package com.hyun.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;
import com.hyun.boardback.dto.response.user.GetUserResponseDto;
import com.hyun.boardback.entity.UserEntity;
import com.hyun.boardback.repository.UserRepository;
import com.hyun.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService{

    private final UserRepository userRepository;
    
    @Override
    public ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email){

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetLoginUserResponseDto.noExistUser();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLoginUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {
        
        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetUserResponseDto.noExistUser();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserResponseDto.success(userEntity);
    }
}
