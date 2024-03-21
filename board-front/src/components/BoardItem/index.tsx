import React from 'react';
import './style.css';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png';

interface Props{
    boardListItem: BoardListItem
}

// component: Board List Item 컴포넌트
export default function BoardItem({ boardListItem }: Props) {

// properties
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, replyCount, viewCount } = boardListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = boardListItem;

// function: 네비게이트 함수
    // const navigator = useNavigate();

// event handler: 게시글 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        // navigator(boardNumber);
    }

// render: Board List Item 컴포넌트 렌더링
    return (
        <div className='board-list-item' onClick={onClickHandler}>
            <div className='board-list-item-main-box'>
                <div className='board-list-item-top'>
                    <div className='board-list-item-profile-box'>
                        <div className='board-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>    
                    </div>    
                    <div className='board-list-item-write-box'>
                        <div className='board-list-item-nickname'>{writerNickname}</div>
                        <div className='board-list-item-write-date'>{writeDatetime}</div>
                    </div>    
                </div>    
                <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>{title}</div>    
                    <div className='board-list-item-content'>{content}</div>    
                </div>    
                <div className='board-list-item-bottom'>
                    <div className='board-list-item-counts'>
                        {`❤ ${favoriteCount} · 💬 ${replyCount} · 👁‍🗨 ${viewCount}`}
                    </div>
                </div>    
            </div>
            {boardTitleImage !== null && (
                <div className='board-list-item-image-box'>
                    <div className='board-list-item-image' style={{backgroundImage: `url(${boardTitleImage})`}}></div>
                </div>
            )}
        </div>
    )
}
