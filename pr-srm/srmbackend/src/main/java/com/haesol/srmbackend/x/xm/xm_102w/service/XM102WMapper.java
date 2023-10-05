package com.haesol.srmbackend.x.xm.xm_102w.service;

import com.haesol.srmbackend.menu.service.MenuColumnDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface XM102WMapper {
   List<MenuColumnDTO> getSearchList(XM102WVO requestVo);
}
