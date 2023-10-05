package com.haesol.srmbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SrmbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrmbackendApplication.class, args);
    }
}
