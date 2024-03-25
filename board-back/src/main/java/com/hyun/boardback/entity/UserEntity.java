package com.hyun.boardback.entity;

import com.hyun.boardback.dto.request.auth.SignUpRequestDto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user")
public class UserEntity {
    
    @Id
    private String email;

    private String password;

    private String nickname;

    private String tel;

    private String address;

    private String addressDetail;
    
    private String profileImage;

    private boolean agreedPersonal;

    public UserEntity(SignUpRequestDto dto){

        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.nickname = dto.getNickname();
        this.tel = dto.getTel();
        this.address = dto.getAddress();
        this.addressDetail = dto.getAddressDetail();
        this.agreedPersonal = dto.getAgreedPersonal();
    }
}
