package com.haesol.srmbackend.x.xm.xm_101w.service;

import com.haesol.srmbackend.menu.service.MenuDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface XM101WMapper {
   List<MenuDTO> getSearchList(XM101WVO requestVo);

   List<MenuDTO> getMenuListPopup(String type);
}
