package com.haesol.srmbackend.exception.auth;

public class AuthException extends RuntimeException {

    private int code;
    public AuthException(int code, String msg) {
        super(msg);
        this.code = code;
    }

    public int getHttpStatusCode() {
        return code;
    }

    public String getErrorMsg() {
        return super.getMessage();
    }
}
