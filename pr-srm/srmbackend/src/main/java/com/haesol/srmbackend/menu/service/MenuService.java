package com.haesol.srmbackend.menu.service;


import java.util.List;
import java.util.Map;

public interface MenuService {
    List<MenuDTO> getMenuList(String id);

    List<MenuColumnDTO> getMenuColumns(MenuColumnVO vo);

    List<Map<String, String>> getDropValues(DropVo vo);
}
