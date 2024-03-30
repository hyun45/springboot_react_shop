import React from 'react';
import './style.css';
import { FavoriteListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png'

interface Props{
    favoriteListItem: FavoriteListItem;
}

// component: Favorite List Item 컴포넌트
export default function FavoriteItem({ favoriteListItem }: Props) {

// state: properties
    const { profileImage, nickname } = favoriteListItem;

// render: Favorite List Item 렌더링
    // return (
    //     <div className='favorite-list-item'>
    //         <div className='favorite-list-item-profile-box'>
    //             <div className='favorite-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
    //         </div>
    //         <div className='favorite-list-item-nickname'>{nickname}</div>
    //     </div>
    // )
    return (
        <div className='flex items-center gap-[6px]'>
            <div className='w-[30px] h-[30px]'>
                <div className='rounded-50% w-full h-full bg-50% bg-100%' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='text-black text-opacity-60 text-[16px] font-medium leading-140%'>{nickname}</div>
        </div>
    )
}
