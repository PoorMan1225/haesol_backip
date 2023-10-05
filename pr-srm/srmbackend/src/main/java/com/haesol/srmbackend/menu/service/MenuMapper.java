package com.haesol.srmbackend.menu.service;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Mapper
public interface MenuMapper {
    List<MenuDTO> getMenuList(String id);

    List<MenuDTO> getMenuListPopup(String type);

    List<MenuColumnDTO> getMenuColumns(MenuColumnVO vo);

    List<Map<String, String>> getDropValues(DropVo vo);
}
