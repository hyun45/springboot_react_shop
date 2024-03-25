package com.hyun.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.dto.response.user.GetLoginUserResponseDto;
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
            if(userEntity == null) return GetLoginUserResponseDto.notExistUser();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLoginUserResponseDto.success(userEntity);
    }
}
