import axios from 'axios';
import { LoginRequestDto, SignUpRequestDto } from './request/auth';
import { LoginResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';
import { GetLoginUserResponseDto } from './response/user';
import { PatchBoardRequestDto, PostBoardRequestDto, PostReplyRequestDto } from './request/board';
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListResponseDto, GetReplyListResponseDto, PutFavoriteResponseDto, PostReplyResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from './response/board';
import { GetPopularListResponseDto } from './response/search';

const DOMAIN = 'http://localhost:4000';

const authorization = (accessToken: string) => {
    return { headers: { authorization: `Bearer ${accessToken}` } };
};

const LOGIN_URL = () => `${DOMAIN}/auth/login`;
const SIGN_UP_URL = () => `${DOMAIN}/auth/signUp`;

export const loginRequest = async (requestBody: LoginRequestDto) => {
    const result = await axios.post(LOGIN_URL(), requestBody)
        .then(response => {
            const responseBody: LoginResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

const POST_BOARD_URL = () => `${DOMAIN}/board`;

export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })

    return result;
};

const Get_Login_USER_URL = () => `${DOMAIN}/user`;

export const getLoginUserRequest = async (accessToken: string) => {

    const result = await axios.get(Get_Login_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetLoginUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const File_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${File_DOMAIN}/upload`;

const multipartFormData =  { headers: {'Content-Type': 'multipart/form-data'} };

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        });

    return result;
};

const GET_BOARD_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}/increase-view-count`

export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
        .then(response => {
            const responseBody: IncreaseViewCountResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })

    return result;
};

const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}/favorite-list`;

export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const GET_REPLY_LIST_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}/reply-list`;

export const GetReplyListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_REPLY_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetReplyListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const PUT_FAVORITE_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}/favorite`;

export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then(response => {
            const responseBody: PutFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const POST_REPLY_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}/reply`;

export const postReplyRequest = async (boardNumber: number | string, requestBody: PostReplyRequestDto, accessToken: string) => {
    const result = await axios.post(POST_REPLY_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostReplyResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const DELETE_BOARD_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}`;

export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const PATCH_BOARD_URL = (boardNumber: number | string) => `${DOMAIN}/board/${boardNumber}`;

export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const GET_LATEST_BOARD_LIST_URL = () => `${DOMAIN}/board/latest-list`;

export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetLatestBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const GET_TOP_3_BOARD_LIST_URL = () => `${DOMAIN}/board/top-3`;

export const getTop3BoardListRequest = async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetTop3BoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};

const GET_POPOULAR_LIST_URL = () => `${DOMAIN}/search/popular-list`;

export const getPopularListRequest = async () => {
    const result = await axios.get(GET_POPOULAR_LIST_URL())
        .then(response => {
            const responseBody: GetPopularListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

    return result;
};