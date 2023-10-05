package com.haesol.srmbackend.exceptionHandler;

import com.haesol.srmbackend.common.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @Valid 로 들어온 예외 사항들을 처리해주는 ControllerAdvice
 */
@RestControllerAdvice
public class BindingValidExceptionHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(BindingValidExceptionHandler.class);

    // 여러개의 요청이 가더라도 한개의 경우 문제가 발생했을 시에 하나의 응답만 리턴하기 때문에 문제 없음.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<?> processValidationError(MethodArgumentNotValidException exception) {
        LOGGER.info("[BindingValidExceptionHandler] : {}", exception.getBindingResult());
        BindingResult bindingResult = exception.getBindingResult();

        StringBuilder builder = new StringBuilder();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            builder.append("[");
            builder.append(fieldError.getField());
            builder.append("](은)는 ");
            builder.append(fieldError.getDefaultMessage());
            builder.append(" 입력된 값: [");
            builder.append(fieldError.getRejectedValue());
            builder.append("]");
        }
        // 헤더 정보 필요할 경우 ResponseEntity 로 해야겠?
        return new ApiResponse<>(false, "유효하지 않은 파라미터 정보입니다.", builder.toString());
    }
}
