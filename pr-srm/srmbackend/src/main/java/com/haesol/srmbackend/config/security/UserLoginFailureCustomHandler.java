package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class UserLoginFailureCustomHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(UserLoginFailureCustomHandler.class);

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String message = getExceptionMessage(exception);
        ApiResponse<String> errorResult = new ApiResponse<>(false, message, null);
        String res = objectMapper.writeValueAsString(errorResult);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(res);
    }

    public String getExceptionMessage(AuthenticationException exception) {
        String message = "";
        if(exception instanceof BadCredentialsException) {
            message = "아이디 혹은 비밀번호를 확인하여 주세요";
        } else {
            message = exception.getMessage();
        }
        return message;
    }
}