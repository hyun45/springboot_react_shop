package com.hyun.boardback.dto.request.board;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostBoardRequestDto {
    
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull    // 빈 배열도 가능
    private List<String> boardImageList;
}
