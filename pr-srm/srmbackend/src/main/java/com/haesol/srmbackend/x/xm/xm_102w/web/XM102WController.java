package com.haesol.srmbackend.x.xm.xm_102w.web;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.menu.service.ColumnDTO;
import com.haesol.srmbackend.menu.service.MenuColumnDTO;
import com.haesol.srmbackend.x.xm.xm_102w.service.XM102WService;
import com.haesol.srmbackend.x.xm.xm_102w.service.XM102WVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/x/xm/xm_102w")
public class XM102WController {
    private final Logger LOGGER = LoggerFactory.getLogger(XM102WController.class);
    @Resource(name = "xm102w")
    private XM102WService xm102WService;
//
    @ApiOperation(value = "메뉴컬럼 등록", notes = "<strong>메뉴컬럼 등록 조회 API 입니다.</strong>")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public ApiResponse<?> search(@Valid @RequestBody XM102WVO vo) {
        LOGGER.info("[XM_102W] 메뉴컬럼 등록 조회 수행 , XM_102W_VO : {}", vo);
        List<MenuColumnDTO> response = xm102WService.getSearchList(vo);
        LOGGER.info("[XM_102W] 메뉴컬럼 등록 조회 수행 종료 , XM_102W_VO : {}", response);
        return new ApiResponse<>(true, "OK", response);
    }
}
