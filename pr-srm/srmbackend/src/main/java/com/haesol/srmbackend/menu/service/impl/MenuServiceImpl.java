package com.haesol.srmbackend.menu.service.impl;

import com.haesol.srmbackend.menu.service.*;
import com.haesol.srmbackend.menu.service.ColumnDTO;
import com.haesol.srmbackend.popup.service.PopupDTO;
import com.haesol.srmbackend.utils.ColumnTypeProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service("menuService")
public class MenuServiceImpl implements MenuService {
    private List<MenuDTO> menuDTOList;
    private final Logger LOGGER = LoggerFactory.getLogger(MenuServiceImpl.class);

    private final MenuMapper menuMapper;
    private final ColumnTypeProvider provider = ColumnTypeProvider.getInstance();

    @Override
    @Cacheable(value = "menuList", key = "#id")
    public List<MenuDTO> getMenuList(String id) {
        Optional<List<MenuDTO>> optionalList = Optional.of(menuMapper.getMenuList(id));
        menuDTOList = optionalList.orElseGet(Collections::emptyList);

        List<MenuDTO> parentList = menuDTOList.stream()
                .filter(menuDTO -> menuDTO.getP_MENU_ID().equals("*") && menuDTO.getMENU_LVL() == 1)
                .peek(menuDTO -> {
                    menuDTO.setPATH_STRING(menuDTO.getC_MENU_NM());
                    menuDTO.setPATH(menuDTO.getC_MENU_ID());
                })
                .collect(Collectors.toList());

        DFS(parentList);
        return parentList;
    }


    @Override
    @Transactional
    public List<MenuColumnDTO> getMenuColumns(MenuColumnVO vo) {
        List<MenuColumnDTO> menuColumns = menuMapper.getMenuColumns(vo);
        if (menuColumns.size() <= 0) return Collections.emptyList();

        // Drop 다운이 있는 메뉴는 가져와서 드롭 데이터를 세팅해줍니다.
        return menuColumns.stream().peek((menuColumn) -> {
            if (!menuColumn.getCOL_MCD().equals("")) {
                DropVo dropVo = new DropVo(menuColumn.getDIV_CD(), menuColumn.getCOL_MCD());
                menuColumn.setDROP_VALUES(getDropValues(dropVo));
            }
        }).collect(Collectors.toList());
    }

    @Override
    public List<Map<String, String>> getDropValues(DropVo vo) {
        return menuMapper.getDropValues(vo);
    }

    public void DFS(List<MenuDTO> parentList) {
        for (MenuDTO parentDTO : parentList) {
            List<MenuDTO> childList = menuDTOList.stream()
                    .filter(childDto -> parentDTO.getC_MENU_ID().equals(childDto.getP_MENU_ID()))
                    .peek(childDto -> {
                        childDto.setPATH(parentDTO.getPATH() + "/" + childDto.getC_MENU_ID());
                        childDto.setPATH_STRING(parentDTO.getPATH_STRING() + "/" + childDto.getC_MENU_NM());
                    })
                    .collect(Collectors.toList());

            parentDTO.setSUB_MENUS(childList);
            DFS(childList);
        }
    }
}
