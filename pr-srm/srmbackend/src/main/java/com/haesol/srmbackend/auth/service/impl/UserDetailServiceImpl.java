package com.haesol.srmbackend.auth.service.impl;

import com.haesol.srmbackend.auth.service.PrincipalDetails;
import com.haesol.srmbackend.auth.service.UserDTO;
import com.haesol.srmbackend.auth.service.UserMapper;
import com.haesol.srmbackend.exception.mybatis.MyBatisException;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@RequiredArgsConstructor
@Service("userDetailService")
public class UserDetailServiceImpl implements UserDetailsService {
    private final Logger LOGGER = LoggerFactory.getLogger(UserDetailServiceImpl.class);
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("[loadUserByUsername] Loading user by username: {}", username);
        try {
            Optional<UserDTO> userDto = userMapper.getByUserId(username);
            return userDto.map(PrincipalDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("아이디 또는 비밀번호를 확인하여 주세요."));
        } catch (Exception e) {
            if(e instanceof SQLException) {
                throw new MyBatisException("데이터베이스 연결에 실패하였습니다.");
            }else if(e instanceof PersistenceException) {
                throw new MyBatisException("입력 오류 (SqlException 입니다.)");
            }
            LOGGER.error("Error while loading user: {}", e.getMessage());
            throw new MyBatisException("사용자 정보를 불러오는 동안 오류가 발생했습니다.");
        }
    }
}