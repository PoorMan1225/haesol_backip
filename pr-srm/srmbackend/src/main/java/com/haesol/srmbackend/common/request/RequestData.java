package com.haesol.srmbackend.common.request;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Getter
@ToString
public class RequestData<T> {
    @Valid
    @NotNull
    private T data;
}
