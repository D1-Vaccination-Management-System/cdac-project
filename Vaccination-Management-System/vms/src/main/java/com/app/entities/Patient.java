package com.app.entities;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PATIENTS")
@Getter
@Setter
@NoArgsConstructor
public class Patient extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
	@Column(name = "patient_id")
	private Long patientId;

	@Column(name = "first_name", length = 30)
	private String firstName;

	@Column(name = "last_name", length = 30)
	private String lastName;

	@Column(name = "email", length = 50)
	private String email;

	@Column(name = "password", length = 100)
	private String password;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id", nullable = false)
	private Address address;

	@Column(name = "aadhar_card_number", columnDefinition = "CHAR(12)", unique = true, nullable = false)
	private String aadharCardNumber;

	@Column(name = "time_registered")
	@CreationTimestamp
	private LocalDateTime timeRegistered;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "patient_id") 
    private List<Appointments> appointments;
}