package com.haesol.srmbackend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haesol.srmbackend.config.CorsConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CorsConfig config;
    private final ObjectMapper objectMapper;
    private final UserLoginSuccessCustomHandler successHandler;
    private final UserLoginFailureCustomHandler failureHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
//                .formLogin().disable()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/auth/signIn", "/api/menu/menu-list")
                .permitAll() // 인증 무시
                .antMatchers("**exception**").permitAll()
                // 토큰 인증 필요한 url 등 정의할 필요 있음.
                .anyRequest().hasAuthority("ADMIN")
                .and()
                .exceptionHandling()
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()
                .apply(new MyCustomDsl());
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                //swagger
                .antMatchers("/swagger-ui.html", "/swagger/**", "/v2/api-docs", "/swagger-resources/**", "/webjars/**")
                .antMatchers("/swagger/**", "/sign-api/exception");
    }

    //jwt 커스텀 필터 등록
    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http)  {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http.addFilter(config.corsFilter()); //스프링 시큐리티 필터내에 cors 관련 필터가 있음!! 그래서 제공해주는 필터 객체를 생성후 HttpSecurity에 등록!
            http.addFilter(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider));
            http.addFilter(new UsernamePasswordAuthenticationCustomFilter(authenticationManager, objectMapper , successHandler, failureHandler));
        }
    }
}
