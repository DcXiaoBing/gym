package com.mercury.finalserver.service;

import java.util.Date;
import java.util.List;

import com.mercury.finalserver.bean.Appointment;
import com.mercury.finalserver.dao.AppointmentDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentDao appointmentDao;

    public List<Appointment> getCoachAppointment(long id) {
        return appointmentDao.findByCoachId(id);
    }

    public List<Appointment> getCoachFuthureAppointment(long id) {
        return appointmentDao.getCoachFuthureAppointments(new Date(System.currentTimeMillis()), id);
    }

    public List<Appointment> getCustomerAppointment(long id) {
        return appointmentDao.findByCustomerId(id);
    }

    public List<Appointment> getCustomerFuthureAppointment(long id) {
        return appointmentDao.getCustomerFuthureAppointments(new Date(System.currentTimeMillis()), id);
    }

}