package com.hyun.boardback.common;

public interface ResponseMessage {
    
    // HTTP Status 200
    String SUCCESS = "Success.";

    // HTTP Status 400
    String VALIDATION_FAILED = "Validation Failed.";
    String DUPLICATE_EMAIL = "Duplicate Email.";
    String DUPLICATE_NICKNAME = "Duplicate Nickname.";
    String DUPLICATE_TEL = "Duplicate Tel.";
    String NOT_EXISTED_USER = "Not existed User.";
    String NOT_EXISTED_BOARD = "Not existed Board.";

    // HTTP Status 401
    String SIGN_IN_FAIL = "Sign in Failed.";
    String AUTHORIZATION_FAIL = "Authorization Failed.";

    // HTTP Status 403
    String NO_PERMISSION = "Not have Permission.";

    // HTTP Status 500
    String DATABASE_ERROR = "DataBase Error.";
}
