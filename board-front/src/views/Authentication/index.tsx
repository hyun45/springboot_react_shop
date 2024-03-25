import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { LoginRequestDto } from 'apis/request/auth';
import { loginRequest } from 'apis';
import { LoginResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

// component: 인증 화면 컴포넌트
export default function Authentication() {

// state: 화면 상태
    const [view, setView] = useState<'login' | 'signUp'>('login');

// state: 쿠키 상태
    const [cookie, setCookie] = useCookies();

// function: 네이게이트 함수
    const navigate = useNavigate();

// component: Login card 컴포넌트
    const LoginCard = () => {

// state: 이메일 요소 참조 상태
        const emailRef = useRef<HTMLInputElement | null>(null);
        
// state: 비밀번호 요소 참조 상태
        const passwordRef = useRef<HTMLInputElement | null>(null);

// state: 이메일 상태
        const [email, setEmail] = useState<string>('');

// state: 비밀번호 상태
        const [password, setPassword] = useState<string>('');

// state: 비밀번호 타입 상태
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

// state: 에러 상태
        const [error, setError] = useState<boolean>(false);

// state: 비밀번호 아이콘 상태
        const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');

// function: login response 처리 함수
        const loginResponse = (responseBody: LoginResponseDto | ResponseDto | null) => {
            if(!responseBody){
                alert('네트워크 에러입니다.');
                return;
            };
            const {code} = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code === 'LF' || code === 'VF') setError(true);
            if(code === 'SU') return;

            const {token, expirationTime} = responseBody as LoginResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);
            
            setCookie('accessToken', token, {expires, path: MAIN_PATH()});
            navigate(MAIN_PATH());
        };

// event handler: 이메일 변경 이벤트 처리
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const {value} = event.target;
            setEmail(value);
        };

// event handler: 비밀번호 변경 이벤트 처리
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const {value} = event.target;
            setPassword(value);
        };

// event handler: 로그인 버튼 클릭 이벤트 처리
        const onLoginButtonClickHandler = () => {
            const requestBody: LoginRequestDto = {email, password};
            loginRequest(requestBody).then(loginResponse);
        };

// event handler: 회원가입 링크 클릭 이벤트 처리
        const onSignUpLinkClickHandler = () => {
            setView('signUp');
        };


// event handler: 패스워드 아이콘 클릭 이벤트 처리
        const onPasswordIconClickHandler = () => {
            if(passwordType === 'text'){
                setPasswordType('password');
                setPasswordIcon('eye-off-icon');
            } else{
                setPasswordType('text');
                setPasswordIcon('eye-on-icon');
            };
        };
        
// event handler: 이메일 키다운 아이콘 클릭 이벤트 처리
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!passwordRef.current) return;
            passwordRef.current.focus();
        };

// event handler: 비밀번호 키다운 아이콘 클릭 이벤트 처리
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            onLoginButtonClickHandler();
        };


        return (
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{'로그인 페이지'}</div>
                        </div>
                            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
                            <InputBox ref={passwordRef} label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordIcon} onButtonClick={onPasswordIconClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                    </div>
                    <div className='auth-card-bottom'>
                        {error &&
                            <div className='auth-login-error-box'>
                                <div className='auth-login-error-message'>
                                    {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n 입력하신 내용을 다시 확인해주세요.'}
                                </div>
                            </div>
                        }
                        <div className='auth-login-button'>{'로그인'}</div>
                        <div className='auth-description-box'>
                            <div className='auth-description'>
                                {'아직 회원이 아니신가요? '}
                                <span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
// component: Sign Up card 컴포넌트
    const SignUpCard = () => {
        
        return (
            <div className='auth-card'></div>
        );
    };

// render: 인증 화면 컴포넌트 렌더링
    return (
        <div id='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-jumbotron-box'>
                    <div className='auth-jumbotron-content'>
                        <div className='auth-logo-icon'></div>
                        <div className='auth-jumbotron-text-box'>
                            <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
                            <div className='auth-jumbotron-text'>{`Hyun's Blog입니다.`}</div>
                        </div>
                    </div>
                </div>
                {view === 'signUp' && <SignUpCard />}
                {view === 'login' && <LoginCard />}
            </div>
        </div>
    )
}
