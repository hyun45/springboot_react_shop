import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

// component: 헤더 레이아웃
export default function Header() {

// state: cookie 상태
    const [cookies, setCookies] = useCookies();

// state: 로그인 상태
    const [isLogin, setLogin] = useState<boolean>(false);

// state: 로그인 유저 상태
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

// state: pathname 상태
    const { pathname } = useLocation();

// state: 메인 페이지 상태
    const [isMainPage, setMainPage] = useState<boolean>(false);
// state: 인증 페이지 상태\
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
// state: 유저 페이지 상태
    const [isUserPage, setUserPage] = useState<boolean>(false);
// state: 검색 페이지 상태
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
// state: 게시글 작성 페이지 상태
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
// state: 게시글 상세 페이지 상태
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
// state: 게시글 수정 페이지 상태
    const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);

// function: 네이게이트 함수
    const navigate = useNavigate();

// event handler: 로고 클릭 이벤트 처리 함수
    const onLogoClickHandler = () => {
        navigate(MAIN_PATH());
    };

// component: 검색 버튼 컴포넌트
    const SearchButton = () => {

// state: 검색 버튼 요소 참조 상태
        const searchButtonRef = useRef<HTMLDivElement | null>(null);

// state: 검색 버튼 상태
        const [status, setSatus] = useState<boolean>(false);

// state: 검색 상태
        const [word, setWord] = useState<string>('');

// state: 검색어 path variable 상태
        const { searchWord } = useParams();

// event handler: 검색 버튼 클릭 이벤트 처리 함수
        const onSearchButtonClickHandler = () => {
            if(!status){
                setSatus(!status);
                return;
            };
            navigate(SEARCH_PATH(word));
        };

// event handler: 검색 단어 변경 이벤트 처리 함수
        const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setWord(value);
        };

// event handler: 검색어 키 이벤트 처리 함수
        const onSearchWordKeyDownHander = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!searchButtonRef.current) return;
            searchButtonRef.current.click();
        };

// event handler: 검색어 path variable 변경될 때마다 실행되는 함수
        useEffect(() => {
            if(searchWord){
                setWord(searchWord);
                setSatus(true);
            };
        }, [searchWord])


        if(!status)
// render: 검색 버튼 컴포넌트 렌더링 (기본 상태 (false))
            return (
                <div className='icon-button' onClick={onSearchButtonClickHandler}>
                    <div className='icon search-icon'></div>
                </div>
            );
// render: 검색 버튼 컴포넌트 렌더링 (클릭 상태 (true))
            return (
                <div className='header-search-input-box'>
                    <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHander}/>
                    <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
                        <div className='icon search-icon'></div>
                    </div>
                </div>
            );
    };

// component: 마이페이지(로그인 시) 버튼 컴포넌트
    const MyPageButton = () => {

// state: userEmail paht variable 상태
        const { userEmail } = useParams();

// event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
        const onMyPageButtonClickHandler = () => {
            if(!loginUser) return;
            const { email } = loginUser;
            navigate(USER_PATH(email));
        };

// event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
        const onLogoutButtonClickHandler = () => {
            resetLoginUser();
            setCookies('accessToken', '', { path: MAIN_PATH() });
            navigate(MAIN_PATH());
        };

// event handler: 로그인 버튼 클릭 이벤트 처리 함수
        const onLoginButtonClickHandler = () => {
            navigate(AUTH_PATH());
        };

// render: 로그아웃 버튼 컴포넌트 렌더링
        if(isLogin && (userEmail === loginUser?.email))
            return <div className='logout-button' onClick={onLogoutButtonClickHandler}>{'로그아웃'}</div>;

        if(isLogin)
// render: 마이페이지 버튼 컴포넌트 렌더링
            return <div className='mypage-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;

// render: 로그인 버튼 컴포넌트 렌더링
            return <div className='login-button' onClick={onLoginButtonClickHandler}>{'로그인'}</div>;
    };

// component: 업로드 버튼 컴포넌트
    const UploadButton = () => {

// state: 게시글 상태
        const { title, content, boardImageFileList, resetBoard } = useBoardStore();

// state: 게시글 번호 path variable 상태
        const {boardNumber} = useParams();

// function: post board response 처리 함수
        const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code === 'AF' || code === 'NU') navigate(AUTH_PATH());
            if(code === 'VF') alert('제목과 내용은 필수입니다.');
            if(code !== 'SU') return;

            resetBoard();
            if(!loginUser) return;

            const {email} = loginUser;
            navigate(USER_PATH(email));
        };

// function: patch board response 처리 함수
        const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
            if(code === 'VF') alert('제목과 내용은 필수입니다.');
            if(code !== 'SU') return;

            if(!boardNumber) return;
            navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
        }

// event handler: 업로드 버튼 클릭 이벤트 처리 함수
        const onUploadButtonClickHandler = async () => {
            const accessToken = cookies.accessToken;
            if(!accessToken) return;

            const boardImageList: string[] = [];

            for(const file of boardImageFileList){
                const data = new FormData();
                data.append('file', file);

                const url = await fileUploadRequest(data);
                if(url) boardImageList.push(url);
            };

            const isWritePage = pathname === BOARD_PATH() + '/' + BOARD_WRITE_PATH();
            if(isWritePage){
                // 새 게시글 작성 시
                const requestBody: PostBoardRequestDto = {
                    title, content, boardImageList
                };
                postBoardRequest(requestBody, accessToken).then(postBoardResponse);
            } else{
                // 게시글 수정 시
                if(!boardNumber) return;
                const requestBody: PatchBoardRequestDto = {
                    title, content, boardImageList
                };
                patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
            }

        };

        if(title && content)
// render: 업로드 버튼 컴포넌트 렌더링
            return <div className='upload-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>

// render: 업로드 불가 버튼 컴포넌트 렌더링
            return <div className='disable-button'>{'업로드'}</div>
    
    };

// effect: path가 변경될 때마다 실행될 함수
    useEffect(() => {
        const isMainPage = pathname === MAIN_PATH();
        setMainPage(isMainPage);
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage);
        const isUserPage = pathname.startsWith(USER_PATH(''));
        setUserPage(isUserPage);
        const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
        setSearchPage(isSearchPage);
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
        setBoardWritePage(isBoardWritePage);
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
        setBoardDetailPage(isBoardDetailPage);
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
        setBoardUpdatePage(isBoardUpdatePage);
    }, [pathname]);

// effect: login user가 변경될 때마다 실행될 함수
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser]);

// render: 헤더 레이아웃 렌더링
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={onLogoClickHandler}>
                    <div className='icon-box'>
                        <div className='icon logo-color-icon'></div>
                    </div>
                    <div className='header-logo'>{`Hyun's Blog`}</div>
                </div>
                <div className='header-right-box'>
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
                    {(isMainPage || isBoardDetailPage || isSearchPage || isUserPage) && <MyPageButton />}
                    {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
                </div>
            </div>
        </div>
    )
}
