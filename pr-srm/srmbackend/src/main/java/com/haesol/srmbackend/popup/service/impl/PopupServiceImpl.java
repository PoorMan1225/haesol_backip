package com.haesol.srmbackend.popup.service.impl;

import com.haesol.srmbackend.menu.service.*;
import com.haesol.srmbackend.popup.service.PopupDTO;
import com.haesol.srmbackend.popup.service.PopupMapper;
import com.haesol.srmbackend.popup.service.PopupService;
import com.haesol.srmbackend.popup.service.ProgramPopupVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service("popupService")
public class PopupServiceImpl implements PopupService {

    private final Logger LOGGER = LoggerFactory.getLogger(PopupServiceImpl.class);

    private final PopupMapper popupMapper;

    @Override
    public PopupDTO<?> getProgramMenuPopupList(ProgramPopupVO vo) throws ClassNotFoundException {
        List<MenuDTO> popupMenuList = popupMapper.getMenuListPopup(vo);
        List<ColumnDTO> popupColumnListDTO = List.of(
                ColumnDTO.builder()
                        .headerName("프로그램ID")
                        .field("C_MENU_ID")
                        .width(200)
                        .build(),

                ColumnDTO.builder()
                        .headerName("프로그램명")
                        .field("C_MENU_NM")
                        .width(200)
                        .build()
        );
        if (popupMenuList.size() <= 0) return new PopupDTO<MenuDTO>(Collections.emptyList(), popupColumnListDTO);
        return new PopupDTO<>(popupMenuList, popupColumnListDTO);
    }
}
