package com.haesol.srmbackend.auth.service;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.exception.auth.AuthException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface AuthService {
    ApiResponse<?> signUp(List<UserDTO> userDTO) throws AuthException;

    ApiResponse<?> signInToken() throws AuthException;

    ApiResponse<?> logOut(HttpServletRequest request, HttpServletResponse response) throws AuthException;
}
