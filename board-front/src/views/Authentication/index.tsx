import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { LoginRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { loginRequest, signUpRequest } from 'apis';
import { LoginResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

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
            if(code !== 'SU') return;

            const {token, expirationTime} = responseBody as LoginResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + (expirationTime * 1000));
            
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
                        <div className='auth-login-button' onClick={onLoginButtonClickHandler}>{'로그인'}</div>
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

// state: 이메일 참조 상태
        const emailRef = useRef<HTMLInputElement | null>(null);

// state: 비밀번호 참조 상태
        const passwordRef = useRef<HTMLInputElement | null>(null);

// state: 비밀번호 확인 참조 상태
        const passwordCheckRef = useRef<HTMLInputElement | null>(null);

// state: 닉네임 참조 상태
        const nicknameRef = useRef<HTMLInputElement | null>(null);

// state: 전화번호 참조 상태
        const telRef = useRef<HTMLInputElement | null>(null);

// state: 주소 참조 상태
        const addressRef = useRef<HTMLInputElement | null>(null);

// state: 상세 주소 참조 상태
        const addressDetailRef = useRef<HTMLInputElement | null>(null);

// state: 페이지 번호 상태
        const [page, setPage] = useState<1 |2>(1);

// state: 이메일 상태
        const [email, setEmail] = useState<string>('');

// state: 비밀번호 상태
        const [password, setPassword] = useState<string>('');

// state: 비밀번호 확인 상태
        const [passwordCheck, setPasswordCheck] = useState<string>('');

// state: 비밀번호 타입 상태
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

// state: 닉네임 상태
        const [nickname, setNickname] = useState<string>('');

// state: 전화번호 상태
        const [tel, setTel] = useState<string>('');

// state: 주소 상태
        const [address, setAddress] = useState<string>('');

// state: 상세 주소 상태
        const [addressDetail, setAddressDetail] = useState<string>('');

// state: 개인 정보 동의 상태
        const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

// state: 비밀번호 확인 타입 상태
        const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

// state: 이메일 에러 상태
        const [isEmailError, setEmailError] = useState<boolean>(false);

// state: 비밀번호 에러 상태
        const [isPasswordError, setPasswordError] = useState<boolean>(false);

// state: 비밀번호 확인 에러 상태
        const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

// state: 닉네임 에러 상태
        const [isNicknameError, setNicknameError] = useState<boolean>(false);

// state: 전화번호 에러 상태
        const [isTelError, setTelError] = useState<boolean>(false);

// state: 주소 에러 상태
        const [isAddressError, setAddressError] = useState<boolean>(false);

// state: 개인 정보 동의 에러 상태
        const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);

// state: 이메일 에러 메세지 상태
        const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

// state: 비밀번호 에러 메세지 상태
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

// state: 비밀번호 확인 에러 메세지 상태
        const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

// state: 닉네임 에러 메세지 상태
        const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

// state: 전화번호 에러 메세지 상태
        const [telErrorMessage, setTelErrorMessage] = useState<string>('');

// state: 주소 에러 메세지 상태
        const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');

// state: 비밀번호 아이콘 상태
        const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');

// state: 비밀번호 확인 아이콘 상태
        const [passwordCheckIcon, setPasswordCheckIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');

// function: 다음 주소 검색 팝업 오픈 함수
        const open = useDaumPostcodePopup();

// function: sign up response 처리 함수
        const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
            if(!responseBody){
                alert('네트워크 이상입니다.');
                return;
            };

            const { code } = responseBody;
            if(code === 'DE'){
                setEmailError(true);
                setEmailErrorMessage('중복되는 이메일 주소입니다.');
            };
            if(code === 'DN'){
                setNicknameError(true);
                setNicknameErrorMessage('중복되는 닉네임입니다..');
            };
            if(code === 'DT'){
                setTelError(true);
                setTelErrorMessage('중복되는 전화번호입니다.');
            };
            if(code === 'VF') alert('필수 값을 입력하세요.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            setView('login');
        };
 
// event handler: 이메일 변경 이벤트 처리 핸들러
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setEmail(value);
            setEmailError(false);
            setEmailErrorMessage('');
        };

// event handler: 비밀번호 변경 이벤트 처리 핸들러
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setPassword(value);
            setPasswordError(false);
            setPasswordErrorMessage('');
        };

// event handler: 비밀번호 확인 변경 이벤트 처리 핸들러
        const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setPasswordCheck(value);
            setPasswordCheckError(false);
            setPasswordCheckErrorMessage('');
        };

// event handler: 닉네임 변경 이벤트 처리 핸들러
        const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setNickname(value);
            setNicknameError(false);
            setNicknameErrorMessage('');
        };

// event handler: 전화번호 변경 이벤트 처리 핸들러
        const onTelChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setTel(value);
            setTelError(false);
            setTelErrorMessage('');
        };

// event handler: 주소 변경 이벤트 처리 핸들러
        const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setAddress(value);
            setAddressError(false);
            setAddressErrorMessage('');
        };

// event handler: 상세 주소 변경 이벤트 처리 핸들러
        const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setAddressDetail(value);
        };

// event handler: 개인 정보 동의 체크박스 클릭 이벤트 처리
        const onAgreedPersonalClickHandler = () => {
            setAgreedPersonal(!agreedPersonal);
            setAgreedPersonalError(false);
        };

// event handler: 비밀번호 아이콘 버튼 클릭 이벤트 처리
        const onPasswordIconClickHandler = () => {
            if(passwordIcon === 'eye-off-icon'){
                setPasswordIcon('eye-on-icon');
                setPasswordType('text');
            } else{
                setPasswordIcon('eye-off-icon');
                setPasswordType('password');
            };
        };

// event handler: 비밀번호 확인 아이콘 버튼 클릭 이벤트 처리
        const onPasswordCheckIconClickHandler = () => {
            if(passwordCheckIcon === 'eye-off-icon'){
                setPasswordCheckIcon('eye-on-icon');
                setPasswordCheckType('text');
            } else{
                setPasswordCheckIcon('eye-off-icon');
                setPasswordCheckType('password');
            };
        };

// event handler: 주소 버튼 클릭 이벤트 처리
        const onAddressButtonClickHandler = () => {
            open({onComplete});
        };

// event handler: 다음 단계 버튼 클릭 이벤트 처리
        const onNextButtonClickHandler = () => {
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const isEmailPattern = emailPattern.test(email);
            if(!isEmailPattern){
                setEmailError(true);
                setEmailErrorMessage('이메일 주소 형식이 맞지 않습니다.');
            };

            const isCheckedPassword = password.trim().length >= 8;
            if(!isCheckedPassword){
                setPasswordError(true);
                setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
            };

            const isEqualPassword = password === passwordCheck;
            if(!isEqualPassword){
                setPasswordCheckError(true);
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
            };

            if(!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
            setPage(2);
        };

// event handler: 회원가입 버튼 클릭 이벤트 처리
        const onSignUpButtonClickHandler = () => {
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const isEmailPattern = emailPattern.test(email);
            if(!isEmailPattern){
                setEmailError(true);
                setEmailErrorMessage('이메일 주소 형식이 맞지 않습니다.');
            };

            const isCheckedPassword = password.trim().length >= 8;
            if(!isCheckedPassword){
                setPasswordError(true);
                setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
            };

            const isEqualPassword = password === passwordCheck;
            if(!isEqualPassword){
                setPasswordCheckError(true);
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
            };

            if(!isEmailPattern || !isCheckedPassword || !isEqualPassword){
                setPage(1);
                return;
            };

            const hasNickname = nickname.trim().length !== 0;
            if(!hasNickname){
                setNicknameError(true);
                setNicknameErrorMessage('닉네임을 입력해주세요.')
            };

            const telPattern = /^[0-9]{11,13}$/;
            const isTelPattern = telPattern.test(tel);
            if(!isTelPattern){
                setTelError(true);
                setTelErrorMessage('숫자만 입력해주세요.');
            };
            
            const hasAddress = address.trim().length > 0;
            if(!hasAddress){
                setAddressError(true);
                setAddressErrorMessage('주소를 선택해주세요.')
            };

            if(!agreedPersonal) setAgreedPersonalError(true);
            
            if(!hasNickname || !isTelPattern || !hasAddress || !agreedPersonal) return;

            const requsetBody: SignUpRequestDto = {
                email, password, nickname, tel, address, addressDetail, agreedPersonal
            };

            signUpRequest(requsetBody).then(signUpResponse);
        };

// event handler: 로그인 링크 클릭 이벤트 처리
        const onLoginLinkClickHandler = () => {
            setView('login');
        };

// event handler: 이메일 키 다운 이벤트 처리
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!passwordRef.current) return;
            passwordRef.current.focus();
        };

// event handler: 비밀번호 키 다운 이벤트 처리
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!passwordCheckRef.current) return;
            passwordCheckRef.current.focus();
        };

// event handler: 비밀번호 확인 키 다운 이벤트 처리
        const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            onNextButtonClickHandler();
        };

// event handler: 닉네임 키 다운 이벤트 처리
        const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!telRef.current) return;
            telRef.current.focus();
        };

// event handler: 전화번호 키 다운 이벤트 처리
        const onTelKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            onAddressButtonClickHandler();
        };

// event handler: 주소 키 다운 이벤트 처리
        const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        };

// event handler: 상세 주소 키 다운 이벤트 처리
        const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            onSignUpButtonClickHandler();
        };

// event handler: 다음 주소 검색 완료 이벤트 처리
        const onComplete = (data: Address) => {
            const { address } = data;
            setAddress(address);
            setAddressError(false);
            setAddressErrorMessage('');
            if(!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        };

// effect: 페이지가 변경될 때마다 실행될 함수
        useEffect(() => {
            if(page === 2){
                if(!nicknameRef.current) return;
                nicknameRef.current.focus();
            }
        },[page])

// render: sign up card 컴포넌트 렌더링
        return (
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{'회원가입'}</div>
                            <div className='auth-card-page'>{`${page}/2`}</div>
                        </div>
                        {page === 1 && (
                            <>
                                <InputBox ref={emailRef} label='이메일 주소*' type='text' placeholder='이메일 주소를 입력해주세요.' error={isEmailError} message={emailErrorMessage} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
                                <InputBox ref={passwordRef} label='비밀번호*' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={isPasswordError} message={passwordErrorMessage} value={password} onChange={onPasswordChangeHandler} icon={passwordIcon} onButtonClick={onPasswordIconClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                                <InputBox ref={passwordCheckRef} label='비밀번호 확인*' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' error={isPasswordCheckError} message={passwordCheckErrorMessage} value={passwordCheck} onChange={onPasswordCheckChangeHandler} icon={passwordCheckIcon} onButtonClick={onPasswordCheckIconClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
                            </>
                        )}
                        {page === 2 && (
                            <>
                                <InputBox ref={nicknameRef} label='닉네임*' type='text' placeholder='닉네임을 입력해주세요.' error={isNicknameError} message={nicknameErrorMessage} value={nickname} onChange={onNicknameChangeHandler} onKeyDown={onNicknameKeyDownHandler}/>
                                <InputBox ref={telRef} label='전화번호*' type='text' placeholder='전화번호를 입력해주세요.' error={isTelError} message={telErrorMessage} value={tel} onChange={onTelChangeHandler} onKeyDown={onTelKeyDownHandler}/>
                                <InputBox ref={addressRef} label='주소*' type='text' placeholder='주소를 입력해주세요.' error={isAddressError} value={address} message={addressErrorMessage} onChange={onAddressChangeHandler} icon='expand-right-icon' onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler}/>
                                <InputBox ref={addressDetailRef} label='상세 주소' type='text' placeholder='상세 주소를 입력해주세요.' error={false} value={addressDetail} onChange={onAddressDetailChangeHandler} onKeyDown={onAddressDetailKeyDownHandler}/>
                            </>
                        )}
                    </div>
                    <div className='auth-card-bottom'>
                        {page === 1 && (
                            <div className='auth-next-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
                        )}
                        {page === 2 && (
                            <>
                                <div className='auth-consent-box'>
                                    <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                                        <div className={`icon ${agreedPersonal ? 'check-fill-icon' : 'check-empty-icon'}`}></div>
                                    </div>
                                    <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                                    <div className='auth-consent-link'>{'더보기 >'}</div>
                                </div>
                                <div className='auth-signUp-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                            </>
                        )}
                        <div className='auth-description-box'>
                            <div className='auth-description'>
                                {'이미 계정이 있으신가요? '}
                                <span className='auth-description-link' onClick={onLoginLinkClickHandler}>{'로그인'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
