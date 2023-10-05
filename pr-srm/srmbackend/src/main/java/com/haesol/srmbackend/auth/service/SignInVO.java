package com.haesol.srmbackend.auth.service;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class SignInVO {
    @NotEmpty
    private String id;
    @NotEmpty
    @Size(min = 4, max = 30)
    private String password;
}
