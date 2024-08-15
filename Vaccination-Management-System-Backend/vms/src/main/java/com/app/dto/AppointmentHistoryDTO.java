package com.app.dto;

import java.time.LocalDateTime;



import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AppointmentHistoryDTO {
	    
    private VaccinationCenterDTO vaccinationCenter;

    private LocalDateTime bookedAppointmentDate;

    private LocalDateTime createdAppointmentOn;
    
    private Appointment_Status appointmentStatus;

    private Appointment_Type appointmentType;
}
