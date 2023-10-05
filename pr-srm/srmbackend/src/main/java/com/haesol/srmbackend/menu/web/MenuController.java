package com.haesol.srmbackend.menu.web;

import com.haesol.srmbackend.common.request.RequestData;
import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.menu.service.*;
import com.haesol.srmbackend.popup.service.PopupDTO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/menu/")
public class MenuController {
    private final Logger LOGGER = LoggerFactory.getLogger(MenuController.class);
    @Resource(name = "menuService")
    private MenuService menuService;

    @ApiOperation(value = "메뉴 리스트 정보", notes = "<strong>특정 사용자의 메뉴 정보를 가져옵니다.</strong>")
    @RequestMapping(value ="/menu-list", method = RequestMethod.POST)
    public ApiResponse<List<MenuDTO>> getMenuList(@RequestBody @Valid RequestData<String> requestData) {
        LOGGER.info("메뉴 가져오기 실행 : {}", requestData.getData());
        List<MenuDTO> menuDTOList = menuService.getMenuList(requestData.getData());
        LOGGER.info("메뉴 가져오기 실행 완료 : {}", menuDTOList);
        return new ApiResponse<>(true, "메뉴가져오기 성공", menuDTOList);
    }

    @ApiOperation(value = "메뉴 컬럼 정보", notes = "<strong>특정 메뉴의 컬럼 정보를 가지고 옵니다.</strong>")
    @RequestMapping(value ="/menu-columns", method = RequestMethod.POST)
    public ApiResponse<?> getMenuPopupList(@RequestBody @Valid MenuColumnVO vo) {
        LOGGER.info("메뉴 컬럼 정보 가져오기 실행 : {}", vo);
        List<MenuColumnDTO> menuColumns = menuService.getMenuColumns(vo);
        LOGGER.info("메뉴 팝업 가져오기 실행 완료 : {}", menuColumns);
        return new ApiResponse<>(true, "메뉴컬럼 정보 가져오기 성공", menuColumns);
    }
}
