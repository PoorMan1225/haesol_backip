package com.haesol.srmbackend.x.xm.xm_101w.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class XM101WVO {
    @NotEmpty
    @JsonProperty("DIV_CD")
    private String DIV_CD;
    @JsonProperty("P_MENU_ID")
    private String P_MENU_ID;
    @NotEmpty
    @JsonProperty("USE_YN")
    private String USE_YN;
}
