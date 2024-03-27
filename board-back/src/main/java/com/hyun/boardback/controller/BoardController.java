package com.hyun.boardback.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyun.boardback.service.BoardService;
import com.hyun.boardback.dto.request.board.PostBoardRequestDto;
import com.hyun.boardback.dto.request.board.PostReplyRequestDto;
import com.hyun.boardback.dto.response.board.GetBoardResponseDto;
import com.hyun.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.hyun.boardback.dto.response.board.PostBoardResponseDto;
import com.hyun.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hyun.boardback.dto.response.board.PostReplyResponseDto;
import com.hyun.boardback.dto.response.board.GetReplyListResponseDto;
import com.hyun.boardback.dto.response.board.IncreaseViewCountResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(@PathVariable("boardNumber") Integer boardNumber){
        
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@RequestBody @Valid PostBoardRequestDto requestBody, @AuthenticationPrincipal String email){

        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
        
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(@PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email){

        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
        return response;
    }

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(@PathVariable("boardNumber") Integer boardNumber){
        
        ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
        return response;
    }

    @PostMapping("/{boardNumber}/reply")
    public ResponseEntity<? super PostReplyResponseDto> postReply(
        @RequestBody @Valid PostReplyRequestDto requestBody, @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email
        ){
        
            ResponseEntity<? super PostReplyResponseDto> response = boardService.postReply(requestBody, boardNumber, email);
            return response;
    }

    @GetMapping("/{boardNumber}/reply-list")
    public ResponseEntity<? super GetReplyListResponseDto> getReplyList(@PathVariable("boardNumber") Integer boardNumber){

        ResponseEntity<? super GetReplyListResponseDto> response = boardService.getReplyList(boardNumber);
        return response;
    }

    @GetMapping("/{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(@PathVariable("boardNumber") Integer boardNumber){

        ResponseEntity<? super IncreaseViewCountResponseDto> response = boardService.increaseViewCount(boardNumber);
        return response;
    }
}
