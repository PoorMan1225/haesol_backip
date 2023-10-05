package com.haesol.srmbackend.popup.service;

import com.haesol.srmbackend.menu.service.MenuDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PopupMapper {

    List<MenuDTO> getMenuListPopup(ProgramPopupVO vo);
}
