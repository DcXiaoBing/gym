package com.mercury.finalserver.controller;

import java.util.List;
import com.mercury.finalserver.bean.Appointment;
import com.mercury.finalserver.service.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppointmentController {
    
    @Autowired
    AppointmentService appointmentService;
    
    @GetMapping(value = "/coach/{id}")
    public List<Appointment> getCoachAppointment(@PathVariable(name = "id") long id) {
        // TODO: hanld getRequest
        return null;
    }
}
