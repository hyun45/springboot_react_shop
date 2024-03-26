package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.request.board.PostBoardRequestDto;
import com.hyun.boardback.dto.response.board.GetBoardResponseDto;
import com.hyun.boardback.dto.response.board.PostBoardResponseDto;
import com.hyun.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hyun.boardback.dto.response.board.GetFavoriteListResponseDto;

public interface BoardService {
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
}
