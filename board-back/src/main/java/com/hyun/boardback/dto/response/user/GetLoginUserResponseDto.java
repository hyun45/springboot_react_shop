package com.hyun.boardback.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hyun.boardback.common.ResponseCode;
import com.hyun.boardback.common.ResponseMessage;
import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetLoginUserResponseDto extends ResponseDto{
    
    private String email;

    private String nickname;

    private String profileImage;

    private GetLoginUserResponseDto(UserEntity userEntity){
        
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.profileImage = userEntity.getProfileImage();
    }

    public static ResponseEntity<GetLoginUserResponseDto> success(UserEntity userEntity){

        GetLoginUserResponseDto result = new GetLoginUserResponseDto(userEntity);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){

        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
