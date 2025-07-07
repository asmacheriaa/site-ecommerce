package com.example.demo.service;
import com.example.demo.entities.User;

import com.example.demo.repository.UserRepositiry;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.Collections;

@Service

//@RequiredArgsConstructor//

public class CustomUserDetailsService implements UserDetailsService {



    private final UserRepositiry userRepository;

    public CustomUserDetailsService(UserRepositiry userRepository) {

        this.userRepository = userRepository;

    }

    

    @Override

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


        User user = userRepository.findByUsername(username);

        

        if (user == null) {

            throw new UsernameNotFoundException("User not found with username: " + username);

        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getMotPasse(),Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))

        );

    }

}

