import { BoardListItem } from 'types/interface';

const latestBoardListMock: BoardListItem[] = [
    {
        boardNumber: 1,
        title: "테스트 제목입니다.",
        content: "테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다.",
        boardTitleImage: null,
        favoriteCount: 0,
        replyCount: 0,
        viewCount: 0,
        writeDatetime: "2024.03.21. 11:26:30",
        writerNickname: "테스트 닉네임",
        writerProfileImage: null
    }, {
        boardNumber: 2,
        title: "테스트 제목2입니다.",
        content: "테스트 내용2입니다. 테스트 내용2입니다. 테스트 내용2입니다. 테스트 내용2입니다. 테스트 내용2입니다. 테스트 내용2입니다. 테스트 내용2입니다.",
        boardTitleImage: "https://via.placeholder.com/600x400?text=no+thumbnail+image",
        favoriteCount: 0,
        replyCount: 0,
        viewCount: 0,
        writeDatetime: "2024.03.21. 11:26:33",
        writerNickname: "테스트 닉네임",
        writerProfileImage: 'https://via.placeholder.com/600x400?text=no+user+image'
    }
];

export default latestBoardListMock;