package com.hyun.boardback.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hyun.boardback.dto.request.auth.LoginRequestDto;
import com.hyun.boardback.dto.request.auth.SignUpRequestDto;
import com.hyun.boardback.dto.response.ResponseDto;
import com.hyun.boardback.dto.response.auth.LoginResponseDto;
import com.hyun.boardback.dto.response.auth.SignUpResponseDto;
import com.hyun.boardback.entity.UserEntity;
import com.hyun.boardback.provider.JwtProvider;
import com.hyun.boardback.repository.UserRepository;
import com.hyun.boardback.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    @Autowired
    private final UserRepository userRepository;
    
    // 다른 방법
    // public AuthServiceImplement(UserRepository userRepository){
    //     this.userRepository = userRepository;
    // }

    // @Autowired
    // public void setUserRepository(UserRepository userRepository){
    //     this.userRepository = userRepository;
    // }

    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            String email = dto.getEmail();
            boolean existsByEmail = userRepository.existsByEmail(email);
            if(existsByEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existsByNickname = userRepository.existsByNickname(nickname);
            if(existsByNickname) return SignUpResponseDto.duplicateNickname();

            String tel = dto.getTel();
            boolean existsByTel = userRepository.existsByTel(tel);
            if(existsByTel) return SignUpResponseDto.duplicateTel();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
            

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto) {
        
        String token = null;

        try {
            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return LoginResponseDto.loginFail();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);

            if(!isMatched) return LoginResponseDto.loginFail();

            token = jwtProvider.create(email);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return LoginResponseDto.success(token);
    }
    
}
