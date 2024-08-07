package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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

	private String createdBy;

}
