package com.haesol.srmbackend.x.xm.xm_101w.service.impl;

import com.haesol.srmbackend.common.response.ApiResponse;
import com.haesol.srmbackend.menu.service.MenuDTO;
import com.haesol.srmbackend.x.xm.xm_101w.service.XM101WMapper;
import com.haesol.srmbackend.x.xm.xm_101w.service.XM101WService;
import com.haesol.srmbackend.x.xm.xm_101w.service.XM101WVO;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service("xm_101w")
public class XM101WServiceImpl implements XM101WService {

    private XM101WMapper xm101WMapper;

    public XM101WServiceImpl(XM101WMapper xm101WMapper) {
        this.xm101WMapper = xm101WMapper;
    }

    @Override
    public ApiResponse<?> getSearchList(XM101WVO requestVo) {
        List<MenuDTO> xm101wList = xm101WMapper.getSearchList(requestVo);
        ApiResponse<List<MenuDTO>> apiResponse = new ApiResponse<>(true, "OK", xm101wList);
        if(xm101wList.size() <= 0) apiResponse.setResponse(Collections.emptyList());
        return apiResponse;
    }

    @Override
    public ApiResponse<?> delete(List<MenuDTO> menuDTOs) {
        return null;
    }

    @Override
    public ApiResponse<?> save(List<MenuDTO> menuDTOs) {
        return null;
    }
}
