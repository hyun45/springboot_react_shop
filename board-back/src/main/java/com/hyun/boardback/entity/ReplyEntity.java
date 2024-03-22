package com.hyun.boardback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
