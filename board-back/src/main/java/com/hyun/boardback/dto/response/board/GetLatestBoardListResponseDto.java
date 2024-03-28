package com.hyun.boardback.dto.response.board;

import com.hyun.boardback.common.ResponseCode;
import com.hyun.boardback.common.ResponseMessage;
import com.hyun.boardback.dto.object.BoardListItem;
import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.entity.BoardListViewEntity;

import java.util.List;

import org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto{
    
    private List<BoardListItem> latestList;

    private GetLatestBoardListResponseDto(List<BoardListViewEntity> boardEntities){

        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardEntities);
    }

    public static ResponseEntity<GetLatestBoardListResponseDto> success(List<BoardListViewEntity> boardEntities){

        GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(boardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
