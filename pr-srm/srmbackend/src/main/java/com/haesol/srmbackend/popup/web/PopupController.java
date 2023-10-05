package com.haesol.srmbackend.popup.web;

import com.haesol.srmbackend.common.request.RequestData;
import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.popup.service.PopupDTO;
import com.haesol.srmbackend.popup.service.PopupService;
import com.haesol.srmbackend.popup.service.ProgramPopupVO;
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
@RequestMapping("/api/popup/")
public class PopupController {
    private final Logger LOGGER = LoggerFactory.getLogger(PopupController.class);
    @Resource(name = "popupService")
    private PopupService popupService;

    @ApiOperation(value = "프로그램 팝업 정보", notes = "<strong>프로그램 팝업 정보를 가지고 옵니다.</strong>")
    @RequestMapping(value ="/program-popup-list", method = RequestMethod.POST)
    public ApiResponse<PopupDTO<?>> getMenuPopupList(@RequestBody @Valid ProgramPopupVO vo) throws ClassNotFoundException {
        LOGGER.info("프로그램 팝업 가져오기 실행 : {}", vo);
        PopupDTO<?> popupData = popupService.getProgramMenuPopupList(vo);
        LOGGER.info("프로그램 팝업 가져오기 실행 완료 : {}", popupData);
        return new ApiResponse<>(true, "메뉴가져오기 성공", popupData);
    }
}
