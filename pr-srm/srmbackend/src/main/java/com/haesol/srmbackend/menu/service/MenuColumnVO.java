package com.haesol.srmbackend.menu.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class MenuColumnVO {
    @NotEmpty
    @JsonProperty("DIV_CD")
    private String DIV_CD;
    @NotEmpty
    @JsonProperty("MENU_ID")
    private String MENU_ID;
    @NotNull
    @JsonProperty("MENU_TAB_NO")
    private int MENU_TAB_NO;
}
