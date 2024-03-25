package com.hyun.boardback.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int boardNumber;

    private String title;

    private String content;

    private String writeDatetime;

    private int favoriteCount;

    private int replyCount;

    private int viewCount;
    
    private String writerEmail;
}
