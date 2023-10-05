package com.haesol.srmbackend.utils;

import com.haesol.srmbackend.auth.service.PrincipalDetails;
import com.haesol.srmbackend.auth.service.UserDTO;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@NoArgsConstructor
public class SecurityUtil {

    //Security Context 에 저장되어있는 인증 객체(유저 객체) 가져오기
    public static Optional<UserDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 인증 정보가 없거나 인증되지 않았을 경우 null 반환
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        return Optional.of(principal.getUser());
    }
}
