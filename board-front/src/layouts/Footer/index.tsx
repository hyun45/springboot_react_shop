import React from 'react';
import './style.css';

// component: Footer 레이아웃
export default function Footer() {

// event handler: 깃허브 아이콘 버튼 클릭 이벤트 처리
const onGithubIconButtonClickHandler = () => {
    window.open('https://github.com/hyun45');
};

// render: Footer 레이아웃 렌더링
    // return (
    //     <div id='footer'>
    //         <div className='footer-container'>
    //             <div className='footer-top'>
    //                 <div className='footer-logo-box'>
    //                     <div className='icon-box'>
    //                         <div className='icon logo-color-icon'></div>
    //                     </div>
    //                     <div className='footer-logo-text'>{`Hyun's Blog`}</div>
    //                 </div>
    //                 <div className='footer-link-box'>
    //                     <div className='footer-email-link'>{'hsb9743@naver.com'}</div>
    //                     <div className='icon-button' onClick={onGithubIconButtonClickHandler}>
    //                         <div className='icon github-icon'></div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className='footer-bottom'>
    //                 <div className='footer-copyright'>{'Copyright 2024. Hyun. All rights reserved.'}</div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className='min-w-full py-10 px-48 bg-gray-600 flex justify-center'>
            <div className='flex flex-col gap-5 w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2.5 items-center'>
                        <div className='w-6 h-6 flex items-center justify-center'>
                            <div className='w-full h-full bg-center bg-100% bg-logo-color-icon'></div>
                        </div>
                        <div className='text-white text-14 font-normal leading-140%'>{`Hyun's Blog`}</div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='text-white text-14 font-normal'>{'hsb9743@naver.com'}</div>
                        <div className='rounded-50% w-6 h-6 flex items-center justify-center cursor-pointer' onClick={onGithubIconButtonClickHandler}>
                            <div className='w-full h-full bg-center bg-100% bg-github-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-white text-sm font-extralight'>{'Copyright 2024. Hyun. All rights reserved.'}</div>
                </div>
            </div>
        </div>
    )
}
