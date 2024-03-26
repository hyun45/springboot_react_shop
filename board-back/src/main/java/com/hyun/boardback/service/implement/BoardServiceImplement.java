package com.hyun.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.hyun.boardback.dto.request.board.PostBoardRequestDto;
import com.hyun.boardback.dto.request.board.PostReplyRequestDto;
import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.dto.response.board.GetBoardResponseDto;
import com.hyun.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.hyun.boardback.dto.response.board.GetReplyListResponseDto;
import com.hyun.boardback.dto.response.board.PostBoardResponseDto;
import com.hyun.boardback.dto.response.board.PostReplyResponseDto;
import com.hyun.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hyun.boardback.entity.BoardEntity;
import com.hyun.boardback.entity.FavoriteEntity;
import com.hyun.boardback.entity.ImageEntity;
import com.hyun.boardback.entity.ReplyEntity;
import com.hyun.boardback.repository.BoardRepository;
import com.hyun.boardback.repository.FavoriteRepository;
import com.hyun.boardback.repository.ImageRepository;
import com.hyun.boardback.repository.ReplyRepository;
import com.hyun.boardback.repository.UserRepository;
import com.hyun.boardback.repository.resultSet.GetBoardResultSet;
import com.hyun.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.hyun.boardback.repository.resultSet.GetReplyListResultSet;
import com.hyun.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement  implements BoardService{

    private final UserRepository userRepository;

    private final BoardRepository boardRepository;

    private final ImageRepository imageRepository;

    private final FavoriteRepository favoriteRepository;

    private final ReplyRepository replyRepository;
    
    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>(); 

            for(String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            };

            imageRepository.saveAll(imageEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {
        
        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {
            resultSet = boardRepository.getBoard(boardNumber);
            if(resultSet == null) return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();

            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        };

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
        
        try {
            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PutFavoriteResponseDto.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if(favoriteEntity == null){
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            } else{
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            };

            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
        
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetFavoriteListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super PostReplyResponseDto> postReply(PostReplyRequestDto dto, Integer boardNumber, String email) {

        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PostReplyResponseDto.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PostReplyResponseDto.noExistUser();

            ReplyEntity replyEntity = new ReplyEntity(dto, boardNumber, email);
            replyRepository.save(replyEntity);

            boardEntity.increaseReplyCount();
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        };

        return PostReplyResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetReplyListResponseDto> getReplyList(Integer boardNumber) {
        
        List<GetReplyListResultSet> resultSets = new ArrayList<>();

        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetReplyListResponseDto.noExistBoard();

            resultSets = replyRepository.getReplyList(boardNumber);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        };

        return GetReplyListResponseDto.success(resultSets);
    }
    
    
}
