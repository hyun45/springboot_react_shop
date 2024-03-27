package com.hyun.boardback.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hyun.boardback.entity.ReplyEntity;
import com.hyun.boardback.repository.resultSet.GetReplyListResultSet;

@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer>{
    
    @Query(
        value = 
        "SELECT " + 
        "U.nickname AS nickname, " + 
        "U.profile_image AS profileImage, " + 
        "R.write_datetime AS writeDatetime, " + 
        "R.content AS content " +
        "FROM reply AS R " + 
        "INNER JOIN user AS U " +
        "ON R.user_email = U.email " +
        "WHERE R.board_number = ?1 " + 
        "ORDER BY writeDatetime DESC",
        nativeQuery = true
    )
    List<GetReplyListResultSet> getReplyList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
