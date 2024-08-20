package com.app.dto;

import com.app.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HealthStaffDTO {
	
    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phoneNumber;

    private String aadharCardNumber;
    
    private Long centerId;
    
    @JsonIgnore
    private Role role;
}
