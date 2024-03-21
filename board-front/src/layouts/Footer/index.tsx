import React from 'react';
import './style.css';

// component: Footer 레이아웃
export default function Footer() {

// event handler: 깃허브 아이콘 버튼 클릭 이벤트 처리
const onGithubIconButtonClickHandler = () => {
    window.open('https://github.com/hyun45');
};

// render: Footer 레이아웃 렌더링
    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'Hyuns Blog'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{'hsb9743@naver.com'}</div>
                        <div className='icon-button' onClick={onGithubIconButtonClickHandler}>
                            <div className='icon github-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{'Copyright 2024. Hyun. All rights reserved.'}</div>
                </div>
            </div>
        </div>
    )
}
