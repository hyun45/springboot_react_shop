enum ResponseCode{

    // HTTP Status 200
    SUCCESS = "SU",

    // HTTP Status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_TEL = "DT",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",

    // HTTP Status 401
    LOGIN_FAIL = "LF",
    AUTHORIZATION_FAIL = "AF",

    // HTTP Status 403
    NO_PERMISSION = "NP",

    // HTTP Status 500
    DATABASE_ERROR = "DBE"
}

export default ResponseCode;