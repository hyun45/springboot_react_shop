import axios from 'axios';
import { LoginRequestDto, SignUpRequestDto } from './request/auth';
import { LoginResponseDto } from './response/auth';
import { ResponseDto } from './response';

const DOMAIN = 'http://localhost:4000';

// const API_DOMAIN = `${DOMAIN}`;

const LOGIN_URL = () => `${DOMAIN}/auth/login`;
const SIGN_UP_URL = () => `${DOMAIN}/auth/signUp`;

export const loginRequest = async (requestBody: LoginRequestDto) => {
    const result = await axios.post(LOGIN_URL(), requestBody)
        .then(response => {
            const responseBody: LoginResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {

}