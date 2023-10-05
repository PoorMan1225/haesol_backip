package com.haesol.srmbackend.popup.service;

import com.haesol.srmbackend.menu.service.ColumnDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PopupDTO<T> {
    private List<T> rowList;
    private List<ColumnDTO> columnList;
}
