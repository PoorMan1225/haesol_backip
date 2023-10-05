package com.haesol.srmbackend.popup.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ProgramPopupVO {
    @NotNull
    @JsonProperty("TYPE")
    private String type;
    @NotNull
    @JsonProperty("MENU_ID")
    private String menuId;
}
