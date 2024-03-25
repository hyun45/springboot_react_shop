import Main from 'views/Main';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Authentication from 'views/Authentication';
import UserView from 'views/User';
import Search from 'views/Search';
import BoardWrite from 'views/Board/Write';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Contatiner';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getLoginUserRequest } from 'apis';
import { GetLoginUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';


// component: Application 컴포넌트
function App() {

// state: 로그인 유저 전역 상태
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

// state: cookie 상태
  const [cookies, setCookie] = useCookies();

// function: get login user response 처리 함수
  const getLoinUserResponse = (responseBody: GetLoginUserResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'AF' || code === 'NU' || code === 'DBE'){
      resetLoginUser();
      return;
    };
    const loginUser: User = { ...responseBody as GetLoginUserResponseDto };
    setLoginUser(loginUser);
  };

// effect: accessToken cookie 값이 변경될 때마다 실행할 함수
  useEffect(() => {
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getLoginUserRequest(cookies.accessToken).then(getLoinUserResponse)
  },[cookies.accessToken])

// rendering: Application 컴포넌트 렌더링
// description: 메인화면 : '/' - Main
// description: 로그인, 회원가입 : '/auth' - Authentication
// description: 유저 페이지 : '/user/:userEmail' - User
// description: 검색 화면 : '/search/:searchWord' - Search
// description: 게시글 작성 : '/board/write' - BoardWrite
// description: 게시글 상세 : '/board/:boardNumber' - BoardDetail
// description: 게시글 수정 : '/board/update/:boardNumber' - BoardUpdate
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />}/>
        <Route path={AUTH_PATH()} element={<Authentication />}/>
        <Route path={USER_PATH(':userEmail')} element={<UserView />}/>
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}/>
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}/>
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />}/>
        </Route>
        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
