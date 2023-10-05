package com.haesol.srmbackend.x.xm.xm_101w.service;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.menu.service.MenuDTO;

import java.util.List;

public interface XM101WService {

    ApiResponse<?> getSearchList(XM101WVO requestVo);

    ApiResponse<?> delete(List<MenuDTO> menuDTOs);

    ApiResponse<?> save(List<MenuDTO> menuDTOs);

}
