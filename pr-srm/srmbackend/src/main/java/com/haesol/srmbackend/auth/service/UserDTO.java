package com.haesol.srmbackend.auth.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    @NotEmpty
    @JsonProperty("DIV_CD")
    private String DIV_CD;

    @NotEmpty
    @JsonProperty("USER_ID")
    private String USER_ID;

    @NotEmpty
    @JsonProperty("USER_PWD")
    @Size(min = 4, max = 30)
    private String USER_PWD;

    @NotEmpty
    @JsonProperty("USER_NM")
    private String USER_NM;

    @Pattern(regexp = "01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$")
    @JsonProperty("USER_PHONE")
    private String USER_PHONE;

    @NotEmpty
    @JsonProperty("USER_GRP")
    private String USER_GRP;

    @JsonProperty("DEPT_CD")
    private String DEPT_CD;

    @NotEmpty
    @JsonProperty("USE_YN")
    private String USE_YN;

    @JsonIgnore
    private LocalDate VALID_FR_DT;

    @JsonIgnore
    private LocalDate VALID_TO_DT;

    @JsonIgnore
    private String LOCK_FLAG;

    @PositiveOrZero
    private int LOGIN_CNT;

    @JsonProperty("CUST_CD")
    private String CUST_CD;

    @JsonIgnore
    private String INSERT_ID;

    @JsonIgnore
    private LocalDate INSERT_DT;

    @JsonIgnore
    private String UPDATE_ID;

    @JsonIgnore
    private LocalDate UPDATE_DT;

    private List<String> roles = new ArrayList<>();
}
