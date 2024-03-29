import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { Board, FavoriteListItem, ReplyListItem } from 'types/interface';
import ReplyItem from 'components/ReplyItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-picture-grey-male-icon.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { GetReplyListRequest, deleteBoardRequest, getBoardRequest, getFavoriteListRequest, increaseViewCountRequest, postReplyRequest, putFavoriteRequest } from 'apis';
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto';
import { ResponseDto } from 'apis/response';
import { DeleteBoardResponseDto, GetFavoriteListResponseDto, GetReplyListResponseDto, IncreaseViewCountResponseDto, PostReplyResponseDto, PutFavoriteResponseDto } from 'apis/response/board';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostReplyRequestDto } from 'apis/request/board';
import { usePagination } from 'hooks';

// component: 게시글 상세 화면 컴포넌트
export default function BoardDetail() {

// state: 로그인 유저 상태
    const {loginUser} = useLoginUserStore();

// state: 게시글 번호 path variable 상태
    const {boardNumber} = useParams();

// state: 쿠키 상태
    const [cookies, setCookies] = useCookies();

// function: navigate 함수
    const navigate = useNavigate();

// function: increase view count response 처리 함수
    const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) => {
        if(!responseBody) return;
        const {code} = responseBody;
        if(code === 'NB') alert('존재하지 않는 게시글입니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
    };

// component: 게시글 상세 화면 상단 컴포넌트
    const BoardDetailTop = () => {

// state: more 버튼 상태
        const [board, setBoard] = useState<Board | null>(null);

// state: more 버튼 상태
        const [showMore, setShowMore] = useState<boolean>(false);

// state: 작성자 여부 상태
        const [isWriter, setWriter] = useState<boolean>(false);

// function: 작성일 포멧 변경 함수
        const getWriteDatetimeFormat = () => {
            if(!board)  return '';
            const date = dayjs(board.writeDatetime);
            return date.format('YYYY. MM. DD.');
        };

// function: get board response 처리 함수
        const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU'){
                navigate(MAIN_PATH());
                return;
            };

            const board: Board = {...responseBody as GetBoardResponseDto};
            setBoard(board);

            if(!loginUser){
                setWriter(false);
                return;
            };
            const isWriter = loginUser.email === board.writerEmail;
            setWriter(isWriter);
        };

// function: delete board response 처리 함수
        const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'VF') alert('잘못된 접근입니다.');
            if(code === 'NU') alert('존재하지 않는 유저입니다.');
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'AF') alert('인증에 실패했습니다.');
            if(code === 'NP') alert('권한이 없습니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            navigate(MAIN_PATH());
        }

// event handler: 닉네임 클릭 이벤트 처리
        const onNicknameClickHandler = () => {
            if(!board) return;
            navigate(USER_PATH(board.writerEmail))
        };

// event handler: more 버튼 클릭 이벤트 처리
        const onMoreButtonClickHandler = () => {
            setShowMore(!showMore);
        };

// event handler: 수정 버튼 클릭 이벤트 처리
        const onUpdateButtonClickHandler = () => {
            if(!board || !loginUser) return;
            if(loginUser.email !== board.writerEmail) return;
            navigate(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
        };

// event handler: 삭제 버튼 클릭 이벤트 처리
        const onDeleteButtonClickHandler = () => {
            if(!boardNumber || !board || !loginUser) return;
            if(loginUser.email !== board.writerEmail) return;

            deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
        };

// effect: 게시글 번호 path varialbe이 바뀔 때마다 게시글 불러오기
        useEffect(() => {
            if(!boardNumber){
                navigate(MAIN_PATH());
                return;
            };
            getBoardRequest(boardNumber).then(getBoardResponse);
        }, [boardNumber]);

// render: 게시글 상세 화면 상단 컴포넌트 렌더링
        if(!board) return <></>
        return (
            <div id='board-detail-top'>
                <div className='board-detail-top-header'>
                    <div className='board-detail-title'>{board.title}</div>
                    <div className='board-detail-top-sub-box'>
                        <div className='board-detail-write-info-box'>
                            <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultProfileImage})`}}></div>
                            <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board.writerNickname}</div>
                            <div className='board-detail-info-divider'>{'\|'}</div>
                            <div className='board-detail-write-date'>{getWriteDatetimeFormat()}</div>
                        </div>
                        {isWriter &&
                            <div className='icon-button' onClick={onMoreButtonClickHandler}>
                                <div className='icon more-icon'></div>
                            </div>
                        }
                        {showMore &&
                            <div className='board-detail-more-box'>
                                <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                                <div className='divider'></div>
                                <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='divider'></div>
                <div className='board-detail-top-main'>
                    <div className='board-detail-main-text'>{board.content}</div>
                    {board.boardImageList.map(image => 
                        <img className='board-detail-main-image' src={image}></img>
                    )}
                </div>
            </div>
        )
    };

// component: 게시글 상세 화면 하단 컴포넌트
    const BoardDetailBottom = () => {

// state: 좋아요 리스트 상태
        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);

// state: 페이지네이션 관련 상태
        const {currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList} = usePagination<ReplyListItem>(3);
// state: 좋아요 상태
        const [isFavorite, setFavorite] = useState<boolean>(false);

// state: 좋아요 목록 상태
        const [showFavorite, setShowFavorite] = useState<boolean>(false);

// state: 전체 댓글 개수 상태
        const [totalReplyCount, setTotalReplyCount] = useState<number>(0);

// state: 댓글 목록 상태
        const [showReply, setShowReply] = useState<boolean>(false);

// state: 댓글 상태
        const [reply, setReply] = useState<string>('');

// state: 댓글 참조 상태
        const replyRef = useRef<HTMLTextAreaElement | null>(null);

// event handler: 좋아요 클릭 이벤트 처리
        const onFavoriteClickHandler = () => {
            if(!boardNumber || !loginUser || !cookies.accessToken) return;
            putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
        };

// event handler: 좋아요 목록 클릭 이벤트 처리
        const onShowFavoriteClickHandler = () => {
            setShowFavorite(!showFavorite);
        };

// event handler: 댓글 목록 클릭 이벤트 처리
        const onShowReplyClickHandler = () => {
            setShowReply(!showReply);
        };

// event handler: 댓글 변경 이벤트 처리
        const onReplyChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const {value} = event.target;
            setReply(value);
            if(!replyRef.current) return;
            replyRef.current.style.height = 'auto';
            replyRef.current.style.height = `${replyRef.current.scrollHeight}px`;
        };

// event handler: 댓글 작성 버튼 클릭 이벤트 처리
        const onReplySubmitButtonClickHandler = () => {
            if(!boardNumber || !reply || !loginUser || !cookies.accessToken) return;      // 작성하지 않으면 button이 disable이어도 클릭 가능
            const requestBody: PostReplyRequestDto = {
                content: reply
            };

            postReplyRequest(boardNumber, requestBody, cookies.accessToken).then(postReplyResponse);
        };

// function: get favorite list respones 처리 함수
        const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            const {favoriteList} = responseBody as GetFavoriteListResponseDto;
            setFavoriteList(favoriteList);

            if(!loginUser){
                setFavorite(false);
                return;
            };

            const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
            setFavorite(isFavorite);
                
        };

// function: get reply list response 처리 함수
        const getReplyListResponse = (responseBody: GetReplyListResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            const {replyList} = responseBody as GetReplyListResponseDto;
            setTotalList(replyList);
            setTotalReplyCount(replyList.length);
        };

// function: put favorite response 처리 함수
        const putFavoriteResponse = (responseBody: PutFavoriteResponseDto |  ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'VF') alert('잘못된 접근입니다.');
            if(code === 'NU') alert('존재하지 않는 유저입니다.');
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'AF') alert('인증에 실패했습니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            if(!boardNumber) return;
            getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
        };

// function: post reply response 처리 함수
        const postReplyResponse = (responseBody: PostReplyResponseDto | ResponseDto | null) => {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'VF') alert('잘못된 접근입니다.');
            if(code === 'NU') alert('존재하지 않는 유저입니다.');
            if(code === 'NB') alert('존재하지 않는 게시글입니다.');
            if(code === 'AF') alert('인증에 실패했습니다.');
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;

            setReply('');   // 작성 시 댓글 작성 칸 비움
            if(!boardNumber) return;
            GetReplyListRequest(boardNumber).then(getReplyListResponse);
        }

// effect: 게시글 번호 path variable이 바뀔 때마다 좋아요 및 댓글 리스트 불러오기
        useEffect(() => {
            if(!boardNumber) return;
            getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
            GetReplyListRequest(boardNumber).then(getReplyListResponse);
        },[boardNumber]);

// render: 게시글 상세 화면 하단 컴포넌트 렌더링
        return (
            <div id='board-detail-bottom'>
                <div className='board-detail-bottom-button-box'>
                    <div className='board-detail-bottom-button-group'>
                        <div className='icon-button' onClick={onFavoriteClickHandler}>
                            {isFavorite ? 
                                <div className='icon favorite-fill-icon'></div> :
                                <div className='icon favorite-unfill-icon'></div>
                            }
                        </div>
                        <div className='board-detail-bottom-button-text'>{`${favoriteList.length}`}</div>
                        <div className='icon-button' onClick={onShowFavoriteClickHandler}>
                            {showFavorite ? 
                                <div className='icon up-icon'></div> :
                                <div className='icon down-icon'></div>
                            }
                        </div>
                    </div>
                    <div className='board-detail-bottom-button-group'>
                        <div className='icon-button'>
                            <div className='icon reply-icon'></div>
                        </div>
                        <div className='board-detail-bottom-button-text'>{`${totalReplyCount}`}</div>
                        <div className='icon-button' onClick={onShowReplyClickHandler}>
                            {showReply ? 
                                <div className='icon up-icon'></div> :
                                <div className='icon down-icon'></div>
                            }
                        </div>
                    </div>
                </div>
                {showFavorite &&
                    <div className='board-detail-bottom-favorite-box'>
                        <div className='board-detail-bottom-favorite-container'>
                            <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
                            <div className='board-detail-bottom-favorite-content'>
                                {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
                            </div>
                        </div>
                    </div>
                }
                {showReply &&
                    <div className='board-detail-bottom-reply-box'>
                        <div className='board-detail-bottom-reply-container'>
                            <div className='board-detail-bottom-reply-title'>{'댓글 '}<span className='emphasis'>{totalReplyCount}</span></div>
                            <div className='board-detail-bottom-reply-list-container'>
                                {viewList.map(item => <ReplyItem replyListItem={item} />)}
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='board-detail-bottom-reply-pagination-box'>
                            <Pagination currentPage={currentPage} currentSection={currentSection} setCurrentPage={setCurrentPage} setCurrentSection={setCurrentSection} viewPageList={viewPageList} totalSection={totalSection}/>
                        </div>
                        {loginUser !== null &&
                            <div className='board-detail-bottom-reply-input-box'>
                                <div className='board-detail-bottom-reply-input-container'>
                                    <textarea ref={replyRef} className='board-detail-bottom-reply-texarea' placeholder='댓글을 작성해주세요.' value={reply} onChange={onReplyChangeHandler}/>
                                    <div className='board-detail-bottom-reply-button-box'>
                                        <div className={reply === '' ? 'disable-button' : 'able-button'} onClick={onReplySubmitButtonClickHandler}>{'댓글 작성'}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    };

    
// effect: 게시글 번호 path variable이 바뀔 때마다 조회수 증가
    let effectFlag = true;
    useEffect(() => {
        if(!boardNumber) return;
        if(effectFlag){
            effectFlag = false;
            return;
        };

        increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
    },[boardNumber]);

// render: 게시글 상세 화면 컴포넌트 렌더링
    return (
        <div id='board-detail-wrapper'>
            <div className='board-detail-container'>
                <BoardDetailTop />
                <BoardDetailBottom />
            </div>
        </div>
    )
}
