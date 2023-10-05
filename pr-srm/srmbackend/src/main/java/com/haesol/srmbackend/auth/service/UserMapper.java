package com.haesol.srmbackend.auth.service;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;

import java.sql.SQLException;
import java.util.Optional;

@Mapper
public interface UserMapper {
    Optional<UserDTO> getByUserId(String id) throws DataAccessException, SQLException;

    int insertUser(UserDTO userDTO) throws DataAccessException;
}
