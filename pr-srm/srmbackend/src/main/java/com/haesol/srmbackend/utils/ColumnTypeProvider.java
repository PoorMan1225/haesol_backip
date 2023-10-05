package com.haesol.srmbackend.utils;

import java.util.HashMap;
import java.util.Map;

public class ColumnTypeProvider {
    private static ColumnTypeProvider provider;
    private Map<String, String> columnTypeMap = new HashMap<>();

    private ColumnTypeProvider() {
        columnTypeMap.put("0", "text");
        columnTypeMap.put("1", "boolean");
        columnTypeMap.put("4", "dateString");
    }

    public static ColumnTypeProvider getInstance() {
        if(provider == null) {
            provider = new ColumnTypeProvider();
        }
        return provider;
    }

    public String getColumnType(String key) {
        return columnTypeMap.getOrDefault(key, "text");
    }
}
