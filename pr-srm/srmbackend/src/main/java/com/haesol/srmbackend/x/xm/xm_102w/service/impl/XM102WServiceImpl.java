package com.haesol.srmbackend.x.xm.xm_102w.service.impl;

import com.haesol.srmbackend.menu.service.MenuColumnDTO;
import com.haesol.srmbackend.menu.service.MenuDTO;
import com.haesol.srmbackend.x.xm.xm_102w.service.XM102WMapper;
import com.haesol.srmbackend.x.xm.xm_102w.service.XM102WService;
import com.haesol.srmbackend.x.xm.xm_102w.service.XM102WVO;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service("xm102w")
public class XM102WServiceImpl implements XM102WService {

    private final XM102WMapper xm102WMapper;

    public XM102WServiceImpl(XM102WMapper xm102WMapper) {
        this.xm102WMapper = xm102WMapper;
    }

    @Override
    public List<MenuColumnDTO> getSearchList(XM102WVO requestVo) {
        List<MenuColumnDTO> list = xm102WMapper.getSearchList(requestVo);
        if(list.size() <= 0) return Collections.emptyList();
        return list;
    }


    @Override
    public int delete(List<MenuDTO> menuDTOs) {
        return 0;
    }

    @Override
    public int save(List<MenuDTO> menuDTOs) {
        return 0;
    }
}
