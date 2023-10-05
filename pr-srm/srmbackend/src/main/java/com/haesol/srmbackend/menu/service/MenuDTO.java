package com.haesol.srmbackend.menu.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MenuDTO {
    @JsonProperty("GU")
    private String GU;
    @NotEmpty
    @JsonProperty("DIV_CD")
    private String DIV_CD;
    @NotEmpty
    @JsonProperty("P_MENU_ID")
    private String P_MENU_ID;
    @JsonProperty("P_MENU_NM")
    private String P_MENU_NM;
    @NotEmpty
    @JsonProperty("P_MENU_TYPE")
    private String P_MENU_TYPE;
    @NotEmpty
    @JsonProperty("C_MENU_ID")
    private String C_MENU_ID;
    @NotEmpty
    @JsonProperty("C_MENU_TYPE")
    private String C_MENU_TYPE;
    @NotEmpty
    @JsonProperty("C_MENU_NM")
    private String C_MENU_NM;
    @NotEmpty
    @JsonProperty("MENU_LVL")
    private Integer MENU_LVL;
    @JsonProperty("MENU_SEQ")
    private Integer MENU_SEQ;
    @NotEmpty
    @JsonProperty("USE_YN")
    private boolean USE_YN;
    @NotEmpty
    @JsonProperty("ICON_NO")
    private String ICON_NO;
    @JsonProperty("PATH")
    private String PATH;
    @JsonProperty("PATH_STRING")
    private String PATH_STRING;
    @NotEmpty
    @JsonIgnore
    private String INSERT_ID;
    @JsonIgnore
    private LocalDate INSERT_DT;
    @JsonIgnore
    private String UPDATE_ID;
    @JsonIgnore
    private LocalDate UPDATE_DT;
    @JsonProperty("SUB_MENUS")
    List<MenuDTO> SUB_MENUS;
}
