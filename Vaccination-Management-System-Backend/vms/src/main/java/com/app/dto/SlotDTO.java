package com.app.dto;

import java.time.LocalDate;

import com.app.entities.AvailableSlots;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SlotDTO {
    private Long slotId;

    private String slot; // This will map to AvailableSlots enum

    private LocalDate date;

    private int capacity;

    private Long vaccinationCenterId;
    
    private Long patientId;
}
