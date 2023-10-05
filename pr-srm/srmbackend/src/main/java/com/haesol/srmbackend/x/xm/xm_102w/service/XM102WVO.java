package com.haesol.srmbackend.x.xm.xm_102w.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class XM102WVO {
    @NotEmpty
    @JsonProperty("DIV_CD")
    private String DIV_CD;
    @NotEmpty
    @JsonProperty("MENU_ID")
    private String MENU_ID;
}
