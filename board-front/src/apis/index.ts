import axios from 'axios';
import { LoginRequestDto, SignUpRequestDto } from './request/auth';
import { LoginResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';
import { GetLoginUserResponseDto } from './response/user';

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
}

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
}

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
}