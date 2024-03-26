package com.hyun.boardback.dto.request.board;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostReplyRequestDto {
    
    @NotBlank
    private String content;
}
