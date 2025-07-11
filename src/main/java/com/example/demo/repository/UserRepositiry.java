package com.example.demo.repository;
import com.example.demo.entities.User; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositiry extends JpaRepository<User, Long> {
	User findByUsername(String username);
}
