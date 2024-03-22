export default interface SignUpRequestDto{
    email: string;
    password: string;
    nickname: string;
    tel: string;
    address: string;
    addressDetail: string | null;
    agreedPersonal: boolean;
}