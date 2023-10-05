package com.haesol.srmbackend.common.request;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Getter
@ToString
public class RequestList<T> {
    @Valid
    @NotNull
    @Size(min = 1)
    private List<T> requestList;
}
