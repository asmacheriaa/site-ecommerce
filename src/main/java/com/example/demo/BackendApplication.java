package com.example.demo;

import com.example.demo.entities.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner init(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.count() == 0) {
				Role admin = new Role();
				admin.setName("ADMIN");
				roleRepository.save(admin);

				Role client = new Role();
				client.setName("CLIENT");
				roleRepository.save(client);
			}
		};
	}
}
