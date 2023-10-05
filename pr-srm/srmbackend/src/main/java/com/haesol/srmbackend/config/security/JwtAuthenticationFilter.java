package com.haesol.srmbackend.config.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 그외에 권한에 관련되어서 이필터를 타게 되는 게 맞음.
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        super(authenticationManager);
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        LOGGER.info(request.getRequestURL().toString());
        String token = jwtTokenProvider.resolveToken(request);
        LOGGER.info("[doFilterInternal] token 값 추출 완료, token : {}", token);
        LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
        // 매 요청 마다 인증객체가 만들어지고, 인증객체가 안만들어 졌을 경우에는
        // 로그인이 안된것으로 판단할 수 있다.
        if(token != null && jwtTokenProvider.validationToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // 인가 검증을 위해서 사용.
            if(authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");
            }
        }
        filterChain.doFilter(request, response);
    }
}
