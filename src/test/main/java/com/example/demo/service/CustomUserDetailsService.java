package com.example.demo.service;
import com.example.demo.entities.User;

import com.example.demo.repository.UserRepository;

//import lombok.RequiredArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;



import java.util.Collections;



@Service

//@RequiredArgsConstructor//

public class CustomUserDetailsService implements UserDetailsService {



    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;

    }

    

    @Override

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Cherche l'utilisateur par username dans la base

        User user = userRepository.findByUsername(username);

        

        if (user == null) {

            throw new UsernameNotFoundException("User not found with username: " + username);

        }

        

        // Crée un UserDetails Spring Security avec username, password et role

        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))

        );

    }

}
public class CustomUserDetailsService {
	

}
