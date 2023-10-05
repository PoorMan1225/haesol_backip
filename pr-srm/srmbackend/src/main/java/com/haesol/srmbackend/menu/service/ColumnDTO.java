package com.haesol.srmbackend.menu.service;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ColumnDTO {
    private String headerName;
    private String field;
    private int width;
    private boolean hide;
    private boolean editable;
    private boolean floatingFilter;
    private String cellDataType;
}
