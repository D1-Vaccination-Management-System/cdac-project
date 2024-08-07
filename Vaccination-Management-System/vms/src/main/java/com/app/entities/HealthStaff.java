package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
public class HealthStaff extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
	@Column(name = "staff_id")
	private Long staffId;

	@Column(name = "first_name", length = 30)
	private String firstName;

	@Column(name = "last_name", length = 30)
	private String lastName;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@Column(name = "aadhar_card_number", columnDefinition = "CHAR(12)", unique = true, nullable = false)
	private String aadharCardNumber;

	@Column(name = "no_of_appointments")
	private int noOfAppointments;

	@Column(name = "center_id")
	private Long centerId; 
}
