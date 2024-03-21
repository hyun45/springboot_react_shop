import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import { favoriteListMock, latestBoardListMock, replyListMock, top3BoardListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import ReplyItem from 'components/ReplyItem';
import FavoriteItem from 'components/FavoriteItem';

function App() {
  return (
    <>
      <div style={{display: 'flex', columnGap: '30px', rowGap: '20px'}}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem} />)}
      </div>
      <div style={{padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {replyListMock.map(replyListItem => <ReplyItem replyListItem={replyListItem} />)}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: '14px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div>
      {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
    </>
  );
}

export default App;
