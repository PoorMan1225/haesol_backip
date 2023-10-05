package com.haesol.srmbackend.auth.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInResultDTO {
    @JsonProperty("ID")
    private String id;
    @JsonProperty("USER_NM")
    private String userNm;
}
