package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.common.response.EntryPointErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 인증이 실패한 상황을 처리하는 EntryPoint
 */
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        LOGGER.info(request.getRequestURL().toString());
        ObjectMapper objectMapper = new ObjectMapper();
        LOGGER.info("[commence] 인증 실패로 response.sendError 발생");

        ApiResponse<String> entryPointErrorResponse = new ApiResponse<>(false, "인증이 실패하였습니다.", null);
        response.setStatus(HttpServletResponse.SC_OK); // 인증실패 코드
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(entryPointErrorResponse));
    }
}
