package com.example.backend_frotas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Permite CORS para todas as rotas
                        .allowedOrigins("http://localhost:4200")  // Origem do frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Métodos liberados
                        .allowCredentials(true);  // Permite envio de cookies/autenticação
            }
        };
    }
}
