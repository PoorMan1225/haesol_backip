package com.haesol.srmbackend.menu.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
public class MenuColumnDTO {
    @JsonProperty("GU")
    private String GU;

    @JsonProperty("DIV_CD")
    private String DIV_CD;

    @JsonProperty("MENU_ID")
    private String MENU_ID;

    @JsonProperty("MENU_NM")
    private String MENU_NM;

    @JsonProperty("MENU_TAB_NO")
    private int MENU_TAB_NO;

    @JsonProperty("COL_ID")
    private String COL_ID;

    @JsonProperty("COL_NO")
    private int COL_NO;

    @JsonProperty("COL_NM")
    private String COL_NM;

    @JsonProperty("COL_WIDTH")
    private int COL_WIDTH;

    @JsonProperty("COL_TYPE")
    private String COL_TYPE;

    @JsonProperty("COL_FIXED")
    private String COL_FIXED;

    @JsonProperty("COL_VA")
    private String COL_VA;

    @JsonProperty("COL_HA")
    private String COL_HA;

    @JsonProperty("COL_EDIT")
    private String COL_EDIT;

    @JsonProperty("COL_HIDDEN")
    private String COL_HIDDEN;

    @JsonProperty("COL_EDITTYPE")
    private String COL_EDITTYPE;

    @JsonProperty("COL_SUM")
    private String COL_SUM;

    @JsonProperty("COL_MERGE")
    private String COL_MERGE;

    @JsonProperty("COL_H_P1")
    private String COL_H_P1;

    @JsonProperty("COL_H_P2")
    private String COL_H_P2;

    @JsonProperty("COL_MCD")
    private String COL_MCD;

    @JsonProperty("COL_SQL")
    private String COL_SQL;

    @JsonProperty("COL_PK")
    private String COL_PK;

    @JsonProperty("COL_REQ")
    private String COL_REQ;

    @JsonIgnore
    private String INSERT_ID;

    @JsonIgnore
    private Date INSERT_DT;

    @JsonIgnore
    private String UPDATE_ID;

    @JsonIgnore
    private Date UPDATE_DT;

    @JsonIgnore
    private String TEMP_CD1;

    @JsonIgnore
    private String TEMP_CD2;

    @JsonIgnore
    private String TEMP_CD3;

    @JsonIgnore
    private double TEMP_NO1;

    @JsonIgnore
    private double TEMP_NO2;

    @JsonIgnore
    private double TEMP_NO3;

    @JsonProperty("DROP_VALUES")
    private List<Map<String, String>> DROP_VALUES;

    // Getter and Setter methods
}
