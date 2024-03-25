package com.hyun.boardback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Corsfig implements WebMvcConfigurer{
    
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry){
        corsRegistry
            .addMapping("/**")
            .allowedMethods("*")
            .allowedOrigins("*");
    }
}
