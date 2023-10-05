package com.haesol.srmbackend.x.xm.xm_102w.service;

import com.haesol.srmbackend.menu.service.ColumnDTO;
import com.haesol.srmbackend.menu.service.MenuColumnDTO;
import com.haesol.srmbackend.menu.service.MenuDTO;

import java.util.List;

public interface XM102WService {

    List<MenuColumnDTO> getSearchList(XM102WVO requestVo);

    int delete(List<MenuDTO> menuDTOs);

    int save(List<MenuDTO> menuDTOs);
}
