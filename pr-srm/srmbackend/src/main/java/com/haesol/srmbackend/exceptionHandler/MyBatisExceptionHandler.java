package com.haesol.srmbackend.exceptionHandler;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.exception.mybatis.MyBatisException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * MyBatisException Handler
 */
@RestControllerAdvice
public class MyBatisExceptionHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(MyBatisExceptionHandler.class);

    @ExceptionHandler(DataAccessException.class)
    public ApiResponse<?> processValidationError(DataAccessException exception) {
        return new ApiResponse<>(false, exception.getMessage(), null);
    }

    @ExceptionHandler(MyBatisException.class)
    public ApiResponse<?> processValidationError(MyBatisException exception) {
        return new ApiResponse<>(false, exception.getMessage(), null);
    }
}
