package com.hyun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hyun.boardback.dto.request.board.PatchBoardRequestDto;
import com.hyun.boardback.dto.request.board.PostBoardRequestDto;
import com.hyun.boardback.dto.request.board.PostReplyRequestDto;
import com.hyun.boardback.dto.response.board.GetBoardResponseDto;
import com.hyun.boardback.dto.response.board.PostBoardResponseDto;
import com.hyun.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hyun.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.hyun.boardback.dto.response.board.PostReplyResponseDto;
import com.hyun.boardback.dto.response.board.GetReplyListResponseDto;
import com.hyun.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.hyun.boardback.dto.response.board.DeleteBoardResponseDto;
import com.hyun.boardback.dto.response.board.PatchBoardResponseDto;
import com.hyun.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.hyun.boardback.dto.response.board.GetTop3BoardListResponseDto;
import com.hyun.boardback.dto.response.board.GetSearchBoardListResponseDto;
import com.hyun.boardback.dto.response.board.GetUserBoardListResponseDto;

public interface BoardService {
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super PostReplyResponseDto> postReply(PostReplyRequestDto dto, Integer boardNumber, String email);
    ResponseEntity<? super GetReplyListResponseDto> getReplyList(Integer boardNumber);
    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord);
    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
}
