import Main from 'views/Main';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Authentication from 'views/Authentication';
import User from 'views/User';
import Search from 'views/Search';
import BoardWrite from 'views/Board/Write';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Contatiner';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';


// component: Application 컴포넌트
function App() {

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
        <Route path={USER_PATH(':userEmail')} element={<User />}/>
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
