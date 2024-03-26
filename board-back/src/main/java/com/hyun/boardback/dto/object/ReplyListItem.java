package com.hyun.boardback.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.hyun.boardback.repository.resultSet.GetReplyListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyListItem {
    
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;

    public ReplyListItem(GetReplyListResultSet resultSet){

        this.nickname = resultSet.getNickname();
        this.profileImage = resultSet.getProfileImage();
        this.writeDatetime = resultSet.getWriteDatetime();
        this.content = resultSet.getContent();
    }

    public static List<ReplyListItem> copyList(List<GetReplyListResultSet> resultSets){
     
        List<ReplyListItem> list = new ArrayList<>();
        for(GetReplyListResultSet resultSet: resultSets){
            ReplyListItem replyListItem = new ReplyListItem(resultSet);
            list.add(replyListItem);
        };
        return list;
    }
}
