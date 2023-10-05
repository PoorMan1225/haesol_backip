package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.common.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 권한이 없는 리소스에 접근할 경우 발생하는 핸들러
 */
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);
    private final ObjectMapper objectMapper;

    public CustomAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        LOGGER.info("[handle] 접근이 막혔을 경우 경로 리다이렉트");
        ApiResponse<String> errorResponse = new ApiResponse<>(false, "권한이 존재하지 않습니다.", null);
        String res = objectMapper.writeValueAsString(errorResponse);
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(res);
    }
}
