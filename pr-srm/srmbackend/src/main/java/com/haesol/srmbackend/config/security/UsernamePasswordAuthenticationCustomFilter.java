package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.auth.service.SignInVO;
import com.haesol.srmbackend.exception.mybatis.MyBatisException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 로그인을 할 상황에서는 이필터만 타는게 맞음.
 */
public class UsernamePasswordAuthenticationCustomFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper;
    private final UserLoginSuccessCustomHandler successHandler;
    private final UserLoginFailureCustomHandler failureHandler;

    private final Logger LOGGER = LoggerFactory.getLogger(UsernamePasswordAuthenticationCustomFilter.class);
    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/api/auth/signIn", "POST");

    protected UsernamePasswordAuthenticationCustomFilter(AuthenticationManager authenticationManager,
                                                         ObjectMapper objectMapper,
                                                         UserLoginSuccessCustomHandler successHandler,
                                                         UserLoginFailureCustomHandler failureHandler) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.objectMapper = objectMapper;
        this.successHandler = successHandler;
        this.failureHandler = failureHandler;
        super.setRequiresAuthenticationRequestMatcher(DEFAULT_ANT_PATH_REQUEST_MATCHER);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //1. body 에서 로그인 정보 받아오기
        SignInVO userVO = null;
        try {
            userVO = objectMapper.readValue(request.getInputStream(), SignInVO.class);
        } catch (IOException e) {
            throw new RuntimeException("Internal server error");
        }
        LOGGER.info("[UserVo] : , {}" , userVO);
        //2. Login ID, Pass 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userVO.getId() , userVO.getPassword());

        //3. User Password 인증이 이루어지는 부분
        //"authenticate" 가 실행될때 "PrincipalDetailService.loadUserByUsername" 실행
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        this.successHandler.onAuthenticationSuccess(request, response, authResult);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        this.failureHandler.onAuthenticationFailure(request,response, failed);
    }
}