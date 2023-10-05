package com.haesol.srmbackend.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Data
@ToString
public class ApiResponse<T> {
    private boolean success; // 1 성공, -1 실패
    private String msg;
    private T response;
}
