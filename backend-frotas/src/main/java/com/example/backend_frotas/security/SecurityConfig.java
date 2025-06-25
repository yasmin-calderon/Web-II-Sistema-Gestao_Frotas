package com.example.backend_frotas.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(CustomUserDetailsService userDetailsService,
                          JwtAuthenticationFilter jwtFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtFilter = jwtFilter;
    }

    /**
     * Provedor de autenticação que recebe o UserDetailsService no construtor
     * e configura o PasswordEncoder. Não usa APIs deprecadas.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Expõe o AuthenticationManager via AuthenticationConfiguration (sem usar .and()).
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig
    ) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Configura todo o fluxo de segurança HTTP via lambda-DSL:
     * - desabilita CSRF
     * - estateless (JWT)
     * - registra nosso DaoAuthenticationProvider
     * - regras de autorização
     * - insere o filtro JWT antes do filtro de sessão padrão
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .csrf(csrf -> csrf
            .ignoringRequestMatchers("/h2-console/**")
          )
          .headers(headers -> headers
            .defaultsDisabled()
            .frameOptions(frameOptions -> frameOptions.sameOrigin())
          )
          .cors(Customizer.withDefaults())
          .sessionManagement(sm ->
              sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          )
          .authenticationProvider(authenticationProvider())
          .authorizeHttpRequests(auth ->
              auth
                .requestMatchers("/auth/**", "/h2-console/**").permitAll()
                //.requestMatchers("/agendamentos/**").permitAll() //permitindo para testes
                .anyRequest().authenticated()
          )
          .addFilterBefore(
              jwtFilter,
              UsernamePasswordAuthenticationFilter.class
          );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Sha256SaltPasswordEncoder();
    }
}
