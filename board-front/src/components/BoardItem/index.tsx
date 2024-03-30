import React from 'react';
import './style.css';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

interface Props{
    boardListItem: BoardListItem
}

// component: Board List Item 컴포넌트
export default function BoardItem({ boardListItem }: Props) {

// state: properties
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, replyCount, viewCount } = boardListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = boardListItem;

// function: 네비게이트 함수
    const navigator = useNavigate();

// event handler: 게시글 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        navigator(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
    }

// render: Board List Item 컴포넌트 렌더링
    // return (
    //     <div className='board-list-item' onClick={onClickHandler}>
    //         <div className='board-list-item-main-box'>
    //             <div className='board-list-item-top'>
    //                 <div className='board-list-item-profile-box'>
    //                     <div className='board-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>    
    //                 </div>    
    //                 <div className='board-list-item-write-box'>
    //                     <div className='board-list-item-nickname'>{writerNickname}</div>
    //                     <div className='board-list-item-write-date'>{writeDatetime}</div>
    //                 </div>    
    //             </div>    
    //             <div className='board-list-item-middle'>
    //                 <div className='board-list-item-title'>{title}</div>    
    //                 <div className='board-list-item-content'>{content}</div>    
    //             </div>    
    //             <div className='board-list-item-bottom'>
    //                 <div className='board-list-item-counts'>
    //                     {`❤ ${favoriteCount} · 💬 ${replyCount} · 👁‍🗨 ${viewCount}`}
    //                 </div>
    //             </div>    
    //         </div>
    //         {boardTitleImage !== null && (
    //             <div className='board-list-item-image-box'>
    //                 <div className='board-list-item-image' style={{backgroundImage: `url(${boardTitleImage})`}}></div>
    //             </div>
    //         )}
    //     </div>
    // )
    return (
        <div className='p-6 bg-white flex items-center gap-[30px] cursor-pointer hover:bg-black hover:bg-opacity-5' onClick={onClickHandler}>
            <div className='flex-1 flex flex-col gap-[15px]'>
                <div className='flex items-center gap-[10px]'>
                    <div className='w-10 h-10'>
                        <div className='rounded-50% w-full h-full bg-50% bg-100%' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>    
                    </div>    
                    <div className='flex flex-col gap-[3px]'>
                        <div className='text-black text-opacity-30 text-[12px] font-medium leading-[150%]'>{writerNickname}</div>
                        <div className='text-black text-opacity-30 text-[11px] font-light leading-[150%]'>{writeDatetime}</div>
                    </div>    
                </div>    
                <div className='flex flex-col gap-[6px]'>
                    <div className='text-black text-[16px] font-extralight leading-140%'>{title}</div>    
                    <div className='text-black text-opacity-60 text-[12px] font-extralight leading-140%'>{content}</div>    
                </div>    
                <div>
                    <div className='text-black text-opacity-60 text-[10px] font-extralight leading-140%'>
                        {`❤ ${favoriteCount} · 💬 ${replyCount} · 👁‍🗨 ${viewCount}`}
                    </div>
                </div>    
            </div>
            {boardTitleImage !== null && (
                <div className='w-[150px] h-[150px]'>
                    <div className='rounded-[10px] w-full h-full bg-50% bg-100%' style={{backgroundImage: `url(${boardTitleImage})`}}></div>
                </div>
            )}
        </div>
    )
}
