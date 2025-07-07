package com.example.demo.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration

@EnableWebSecurity
public class SecurityConfig {
 private final UserDetailsService userDetailsService; 
public SecurityConfig(UserDetailsService userDetailsService) {
         this.userDetailsService = userDetailsService;
	    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	        return http

	        		.csrf(csrf -> csrf.disable()) 
	        		.formLogin(form -> form.disable())
	                .authorizeHttpRequests(auth ->auth
	                		.requestMatchers("/api/v1/login", "/api/v1/register").permitAll()
	                		.anyRequest().authenticated())

	                .build();

	    }

    @Bean
    PasswordEncoder passwordEncoder() {

	        return new BCryptPasswordEncoder();

	    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {

    	 AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
         builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
         return builder.build();
	    }

	}

