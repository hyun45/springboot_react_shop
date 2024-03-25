package com.hyun.boardback.entity;

import com.hyun.boardback.entity.primaryKey.FavoritePk;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "favorite")
@Table(name = "favorite")
@IdClass(FavoritePk.class)
public class FavoriteEntity {
    
    @Id
    private String userEmail;

    @Id
    private int boardNumber;
}
