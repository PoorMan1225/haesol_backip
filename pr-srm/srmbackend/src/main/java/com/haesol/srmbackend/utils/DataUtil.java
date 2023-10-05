package com.haesol.srmbackend.utils;

import com.haesol.srmbackend.menu.service.ColumnDTO;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class DataUtil {
    public static List<ColumnDTO> getPopupColumnList(Class<?> clazz) {
        Field[] fields = clazz.getDeclaredFields();
        List<ColumnDTO> columnDTOS = new ArrayList<>();
        for(Field field : fields) {
//            columnDTOS.add(new ColumnDTO("",field.getName(), 100, false));
        }
        return columnDTOS;
    }
}
