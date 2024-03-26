package com.hyun.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hyun.boardback.common.ResponseCode;
import com.hyun.boardback.common.ResponseMessage;
import com.hyun.boardback.dto.object.ReplyListItem;
import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.repository.resultSet.GetReplyListResultSet;

import lombok.Getter;

@Getter
public class GetReplyListResponseDto extends ResponseDto{
    
    private List<ReplyListItem> replyList;

    private GetReplyListResponseDto(List<GetReplyListResultSet> resultSets){

        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.replyList = ReplyListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetReplyListResponseDto> success(List<GetReplyListResultSet> resultSets){

        GetReplyListResponseDto result = new GetReplyListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){

        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
