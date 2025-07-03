package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long idUtilisateur;
	private String username;
	private String email;
	private String Tel;
	private String motPasse;
	private String confirmMotPasse;
	private  String role;
	
	
	public User() {
		super();
		
	}
	
	public User(String username, String email, String tel, String motPasse, String confirmMotPasse, String role,
			boolean active, String image) {
		super();
		this.username = username;
		this.email = email;
		this.Tel = tel;
		this.motPasse = motPasse;
		this.confirmMotPasse = confirmMotPasse;
		this.role = role;
	
	}

	public Long getIdUtilisateur() {
		return idUtilisateur;
	}
	public void setIdUtilisateur(Long idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return Tel;
	}
	public void setTel(String tel) {
		Tel = tel;
	}
	public String getMotPasse() {
		return motPasse;
	}
	public void setMotPasse(String motPasse) {
		this.motPasse = motPasse;
	}
	public String getConfirmMotPasse() {
		return confirmMotPasse;
	}
	public void setConfirmMotPasse(String confirmMotPasse) {
		this.confirmMotPasse = confirmMotPasse;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	

	@Override
	public String toString() {
		return "User [idUtilisateur=" + idUtilisateur + ", nomUtilisateur=" + username+ ", email=" + email
				+ ", Tel=" + Tel + ", MotPasse=" + motPasse + ", confirmMotPasse=" + confirmMotPasse + ", role=" + role
				+ "]";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
