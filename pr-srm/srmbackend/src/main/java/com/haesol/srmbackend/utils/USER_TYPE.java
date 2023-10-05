package com.haesol.srmbackend.utils;

import java.util.Locale;

public enum USER_TYPE {
    ADMIN("S"),
    ACCOUNT_USER("C"),
    GENERAL_USER("1"),
    NOT_EXITS_USER("E");
    private final String type;
    USER_TYPE(String type) {
        this.type = type;
    }

    public static USER_TYPE getType(String type) {
        switch (type.toUpperCase(Locale.ROOT)) {
            case "S" : return ADMIN;
            case "C" : return ACCOUNT_USER;
            case "1" : return GENERAL_USER;
        }
        return NOT_EXITS_USER;
    }
}
