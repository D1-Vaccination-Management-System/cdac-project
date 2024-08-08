package com.app.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Doctors")
@Getter
@Setter
@NoArgsConstructor
public class Doctor extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
	@Column(name = "doctor_id")
	private Long doctorId;

	@Column(name = "first_name", length = 30)
	private String firstName;

	@Column(name = "last_name", length = 30)
	private String lastName;

	@Column(name = "email", length = 50)
	private String email;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@OneToOne
	@JoinColumn(name = "address_id", nullable = true)
	private Address address;

	@Column(name = "aadhar_card_number", columnDefinition = "CHAR(12)", unique = true, nullable = false)
	private String aadharCardNumber;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(nullable = true)
	Specialization specialization;

	private Integer yearsOfExperience;

}
