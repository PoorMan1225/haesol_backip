package com.haesol.srmbackend.auth.web;

import com.haesol.srmbackend.auth.service.AuthService;
import com.haesol.srmbackend.auth.service.PrincipalDetails;
import com.haesol.srmbackend.auth.service.UserDTO;
import com.haesol.srmbackend.auth.service.SignInVO;
import com.haesol.srmbackend.common.request.RequestList;
import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.exception.auth.AuthException;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Resource(name = "authService")
    private AuthService authService;

    // 토큰 까지 전달해서 검증 필요함.
    @ApiOperation(value = "사용자 정보 등록", notes = "<strong>사용자 정보를 등록합니다.</strong>")
    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ApiResponse<?> signUp(@Valid @RequestBody RequestList<UserDTO> userRequest) {
        LOGGER.info("[signUp] signUp 수행 , userDto : {}", userRequest);
        ApiResponse<?> response = authService.signUp(userRequest.getRequestList());
        LOGGER.info("[signUp] signUp 수행 종료 , userDto : {}", response);
        return response;
    }

    /**
     * 로그인 후에  swr 로 지속 적으로 사용자 토큰이 만료되었는지 체크 후 데이터 가져옴.
     */
    @ApiOperation(value = "사용자 토큰 인증 로그인", notes = "<strong>토큰 정보가 유효하지 않을 경우 로그인 페이지로 리다이렉트 됩니다.</strong>")
    @RequestMapping(value = "/signIn-token", method = RequestMethod.GET)
    public ApiResponse<?> signInToken() {
        return authService.signInToken();
    }

    /**
     * 로그인 된 후에 쿠키 정보를 날려줍니다.
     */
    @RequestMapping(value = "/log-out", method = RequestMethod.POST)
    public ApiResponse<?> logOut(HttpServletRequest request, HttpServletResponse response) {
        return authService.logOut(request, response);
    }

    /**
     * AuthController 안에서 발생하는 인증 예외사항 처리.
     * swith case 를 줘서 여러 인증을 다르게 컨트롤러에서 리턴을 시킬 수 있음.
     */
    @ExceptionHandler(value = AuthException.class)
    public ApiResponse<?> handleException(AuthException e) {
        LOGGER.info("[AuthException ] : {}", e.getErrorMsg());
        return new ApiResponse<>(false, e.getErrorMsg(), null);
    }
}
