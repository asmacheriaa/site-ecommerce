package com.example.demo.controller;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepositiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repository.RoleRepository;
import com.example.demo.entities.Role;


@RestController
@RequestMapping("/api/v1")
public class RegistrationLoginController {

    private final UserRepositiry userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

@Autowired
public RegistrationLoginController(UserRepositiry userRepository,
                                   PasswordEncoder passwordEncoder,
                                   RoleRepository roleRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.roleRepository = roleRepository;
}
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

       
        Role clientRole = roleRepository.findByName("CLIENT");
        if (clientRole == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role CLIENT not found");
        }

        user.setMotPasse(passwordEncoder.encode(user.getMotPasse()));
        user.setRole(clientRole);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userRequest) {
        User user = userRepository.findByUsername(userRequest.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        if (!passwordEncoder.matches(userRequest.getMotPasse(), user.getMotPasse())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        return ResponseEntity.ok("Login successful");
    }
}
