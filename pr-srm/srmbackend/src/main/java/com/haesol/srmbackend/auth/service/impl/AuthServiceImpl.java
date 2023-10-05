package com.haesol.srmbackend.auth.service.impl;

import com.haesol.srmbackend.auth.service.*;
import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.exception.auth.AuthException;
import com.haesol.srmbackend.utils.SecurityUtil;
import com.haesol.srmbackend.utils.USER_TYPE;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RequiredArgsConstructor
@Service("authService")
public class AuthServiceImpl implements AuthService {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public ApiResponse<?> signUp(List<UserDTO> userDTO) throws AuthException {
        userDTO.forEach(userDTO1 -> {
            String type = userDTO1.getUSER_GRP();
            USER_TYPE userType = USER_TYPE.getType(type);
            String role = "ROLE_".concat(userType.toString());
            userDTO1.setRoles(Collections.singletonList(role));
            /**
             * 비밀번호 만료일을 설정해서 dto 에 세팅 해줘야 함.
             */
            String encodePWD = passwordEncoder.encode(userDTO1.getUSER_PWD());
            userDTO1.setUSER_PWD(encodePWD);
            int insertUser = userMapper.insertUser(userDTO1);
            LOGGER.info("[insertUser] : {}" , insertUser);
            if(insertUser <= 0) {
                String msg = String.format("화원 가입 실패 userDTO : %s", userDTO1);
                int code = HttpStatus.INTERNAL_SERVER_ERROR.value();
                throw new AuthException(code, msg);
            }
        });
        return new ApiResponse<>(true, "회원 가입 성공", null);
    }

    @Override
    public ApiResponse<?> signInToken() {
        Optional<UserDTO> optionalUserDTO = SecurityUtil.getCurrentUser();
        UserDTO userDTO = optionalUserDTO.orElseThrow(() -> new AuthException(-1, "인증정보가 존재하지 않습니다."));
        SignInResultDTO signInResultDTO = SignInResultDTO.builder()
                .userNm(userDTO.getUSER_NM())
                .id(userDTO.getUSER_ID())
                .build();
        return new ApiResponse<>(true, "인증정보 가져오기 성공", signInResultDTO);
    }

    @Override
    public ApiResponse<?> logOut(HttpServletRequest request, HttpServletResponse response) throws AuthException {
        Cookie cookie = request.getCookies()[0];
        if(!Objects.isNull(cookie)) {
            cookie.setPath("/");
            cookie.setMaxAge(0);
            cookie.setValue("");
            response.addCookie(cookie);
        }
        return null;
    }
}

