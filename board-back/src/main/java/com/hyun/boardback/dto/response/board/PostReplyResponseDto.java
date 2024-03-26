package com.hyun.boardback.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hyun.boardback.common.ResponseCode;
import com.hyun.boardback.common.ResponseMessage;
import com.hyun.boardback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class PostReplyResponseDto extends ResponseDto{
    
    private PostReplyResponseDto(){

        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PostReplyResponseDto> success(){
        
        PostReplyResponseDto result = new PostReplyResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){

        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistUser(){

        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
