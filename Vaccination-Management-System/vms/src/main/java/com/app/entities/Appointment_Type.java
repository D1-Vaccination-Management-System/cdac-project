package com.app.entities;

public enum Appointment_Type {
	CENTER_VISIT, HOME_VISIT;
}


//package com.app.entities;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "appointment_type")
//public class AppointmentType extends BaseEntity{
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "appointment_type_id", nullable = false)
//	private Long appointmentTypeId;
//	
//	
//	@Column(name = "type_description", nullable = false)
//	private String typeDescription;
//    
//}
