import React from 'react';
import './style.css';
import { ReplyListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png'

interface Props{
    replyListItem: ReplyListItem
}

// component: Reply List Item 컴포넌트
export default function ReplyItem({replyListItem}: Props) {

// properties
    const { nickname, profileImage, writeDatetime, content } = replyListItem;

// render: Reply List Item 렌더링
    return (
        <div className='reply-list-item'>
            <div className='reply-list-item-top'>
                <div className='reply-list-item-profile-box'>
                    <div className='reply-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
                </div>
                <div className='reply-list-item-nickname'>{nickname}</div>
                <div className='reply-list-item-divider'>{'\|'}</div>
                <div className='reply-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='reply-list-item-main'>
                <div className='reply-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
