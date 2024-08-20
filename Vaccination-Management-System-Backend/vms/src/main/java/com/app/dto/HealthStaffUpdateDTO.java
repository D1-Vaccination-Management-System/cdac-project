package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HealthStaffUpdateDTO {
	
    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phoneNumber;

}
