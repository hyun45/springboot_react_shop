package com.hyun.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hyun.boardback.entity.ReplyEntity;

@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer>{
    
}
