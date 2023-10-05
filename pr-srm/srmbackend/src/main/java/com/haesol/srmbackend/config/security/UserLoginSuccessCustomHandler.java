package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.auth.service.PrincipalDetails;
import com.haesol.srmbackend.auth.service.SignInResultDTO;
import com.haesol.srmbackend.auth.service.UserDTO;
import com.haesol.srmbackend.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 성공적으로 로그인 되었을 경우 호출되는 CustomFilter
 * 여기서 jwt 토큰을 반환해 준다.
 */
@Component
@RequiredArgsConstructor
public class UserLoginSuccessCustomHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(UserLoginSuccessCustomHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        LOGGER.info("[로그인 성공] ");

        //1. 로그인 인증을 마친 사용자 가져오기
        UserDTO loginUser = ((PrincipalDetails) authentication.getPrincipal()).getUser();
        //2. 토큰 생성
        String token = jwtTokenProvider.createToken(loginUser.getUSER_NM(), List.of(loginUser.getUSER_GRP()));
        //3. 반환 Dto 생성
        SignInResultDTO signInResultDTO = new SignInResultDTO(loginUser.getUSER_ID(), loginUser.getUSER_NM());
        ApiResponse<SignInResultDTO> dataResponse = new ApiResponse<>(true, "로그인에 성공하였습니다.", signInResultDTO);
        // 4. 쿠키 생성
        // (1) 브라우저를 완전히 종료해야만 쿠키가 사라짐. 탭만 끈다고 해서 쿠키가 사라지는 것은 아님
        // (2) 쿠키 만료시간을 설정해야
        Cookie cookie = new Cookie("authToken", token);
//        cookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (초 단위)
//        cookie.setHttpOnly(true); // JavaScript 에서 접근하지 못하도록 설정
//        cookie.setSecure(true); // HTTPS 연결일 때만 쿠키 전송
        cookie.setPath("/"); // 모든 경로에서 쿠키 접근 가능
        response.addCookie(cookie);
        //5. 응답 Response 생성
        LOGGER.info("[로그인 응답 Response 생성] : {}", signInResultDTO);
        String res = objectMapper.writeValueAsString(dataResponse);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(res);
    }
}