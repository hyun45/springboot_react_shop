import React from 'react';
import './style.css';
import { ReplyListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png';
import dayjs from 'dayjs';

interface Props{
    replyListItem: ReplyListItem
}

// component: Reply List Item 컴포넌트
export default function ReplyItem({replyListItem}: Props) {

// state: properties
    const { nickname, profileImage, writeDatetime, content } = replyListItem;

// function: 작성일 경과 시간 함수
    const getElapsedTime = () => {
        const now = dayjs().add(9, 'hour'); // 한국 시간에 맞게
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's');   // 초 단위
        if(gap < 60) return `${gap}초 전`;
        if(gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if(gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    }


// render: Reply List Item 렌더링
    return (
        <div className='reply-list-item'>
            <div className='reply-list-item-top'>
                <div className='reply-list-item-profile-box'>
                    <div className='reply-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
                </div>
                <div className='reply-list-item-nickname'>{nickname}</div>
                <div className='reply-list-item-divider'>{'\|'}</div>
                <div className='reply-list-item-time'>{getElapsedTime()}</div>
            </div>
            <div className='reply-list-item-main'>
                <div className='reply-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
