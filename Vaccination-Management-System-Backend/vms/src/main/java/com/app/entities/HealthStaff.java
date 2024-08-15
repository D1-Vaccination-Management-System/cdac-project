package com.app.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"listOfAppointments"})
public class HealthStaff extends User {

    @Column(name = "no_of_appointments")
    private int noOfAppointments;
    
    @JsonProperty(access = Access.READ_ONLY)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "staff_id")
    private List<Appointments> listOfAppointments;

    @Column(name = "center_id")
    private Long centerId;
}
