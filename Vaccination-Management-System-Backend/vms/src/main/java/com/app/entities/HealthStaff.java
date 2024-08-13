package com.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
public class HealthStaff extends User {

    @Column(name = "no_of_appointments")
    private int noOfAppointments;

    @Column(name = "center_id")
    private Long centerId;
}
