package com.hyun.boardback.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hyun.boardback.common.ResponseCode;
import com.hyun.boardback.common.ResponseMessage;
import com.hyun.boardback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class LoginResponseDto extends ResponseDto{
    
    private String token;

    private int expirationTime;

    private LoginResponseDto(String token){

        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600; // 60 * 60 (1시간)
    }

    public static ResponseEntity<LoginResponseDto> success(String token){
        LoginResponseDto result = new LoginResponseDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> loginFail(){
        ResponseDto result = new ResponseDto(ResponseCode.LOGIN_FAIL, ResponseMessage.LOGIN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
