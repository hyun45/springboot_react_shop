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
@Entity(name = "reply")
@Table(name = "reply")
public class ReplyEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyNumber;

    private String content;

    private String writeDatetiem;

    private String userEmail;

    private int boardNumber;
}
