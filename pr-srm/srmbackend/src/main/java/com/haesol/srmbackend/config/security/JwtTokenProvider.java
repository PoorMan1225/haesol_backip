package com.haesol.srmbackend.config.security;

import com.haesol.srmbackend.auth.service.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Resource(name = "userDetailService")
    private final UserDetailsService userDetailsService;

    @Value("${springboot.jwt.secret}")
    private String SECRET_KEY = "secretKey";
    private final long tokenValidMillisecond = 1000L * 60 * 60 * 2; // 2시간
//    private final long tokenValidMillisecond = 1000L; // 2시간

    @PostConstruct // 빈객체 로 주입된 이후 수행되는 메서드 를 가리킴
    protected void init() {
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 완료");
    }

    public String createToken(String userId, List<String> roles) {
        LOGGER.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        LOGGER.info("[createToken] 토큰 생성 완료");
        return token;
    }

    public String getUsername(String token) {
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody()
                .getSubject();
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
        return info;
    }

    public String resolveToken(HttpServletRequest request) {
        LOGGER.info("[requset] {}", request.getCookies());
        Cookie[] cookies = request.getCookies();
        if(cookies[0] != null) {
            return cookies[0].getValue();
        }
        return null;
    }

    /**
     * 로그인 구현시에 비밀번호 만료 기능 구현시 변경 소지 있습니다.
     * @param token
     * @return
     */
    public Authentication getAuthentication(String token) {
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        // 권한정보를 가지고옴.
        PrincipalDetails userDetails = (PrincipalDetails) userDetailsService.loadUserByUsername(this.getUsername(token));
        if(Objects.isNull(userDetails)) return null;
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails UserName : {}", userDetails.getAuthorities());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public boolean validationToken(String token) {
        LOGGER.info("[validation] 토큰 유효 체크 시작");
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        }catch (Exception e) {
            LOGGER.info("[validateToken] 토큰 유효 체크 예외 발생");
            return false;
        }
    }
}
