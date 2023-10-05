package com.haesol.srmbackend.x.xm.xm_101w.web;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.x.xm.xm_101w.service.XM101WService;
import com.haesol.srmbackend.x.xm.xm_101w.service.XM101WVO;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/x/xm/xm_101w")
public class XM101WController {
    private final Logger LOGGER = LoggerFactory.getLogger(XM101WController.class);
    @Resource(name = "xm_101w")
    private XM101WService xm101WService;

    @ApiOperation(value = "프로그램 메뉴 등록 조회", notes = "<strong>프로그램 메뉴 등록 조회 API 입니다.</strong>")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public ApiResponse<?> search(@Valid @RequestBody XM101WVO searchRequest) {
        LOGGER.info("[XM_101W] 프로그램 메뉴 등록 조회 수행 , XM_101W_VO : {}", searchRequest);
        ApiResponse<?> response = xm101WService.getSearchList(searchRequest);
        LOGGER.info("[XM_101W] 프로그램 메뉴 등록 조회 수행 종료 , XM_101W_VO : {}", response);
        return response;
    }
}
