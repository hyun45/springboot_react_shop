package com.hyun.boardback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hyun.boardback.entity.SearchLogEntity;
import com.hyun.boardback.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer>{
    
    @Query(
        value = 
        "SELECT search_word AS searchWord, count(search_word) As count " + 
        "FROM search_log " +
        "WHERE relation IS FALSE " + 
        "GROUP BY search_word " +
        "ORDER BY count DESC " + 
        "LIMIT 10",
        nativeQuery = true
    )
    List<GetPopularListResultSet> getPopularList();
}
