package com.mercury.finalserver.dao;

import java.util.Date;
import java.util.List;

import com.mercury.finalserver.bean.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentDao extends JpaRepository<Appointment, Long> {

    public List<Appointment> findByCoachId(long coachId);
    public List<Appointment> findByCustomerId(long customerId);

    @Query("select a from Appointment a where a.startTime > :time AND a.customer.id = :coachId")
    public List<Appointment> getCoachFuthureAppointments(@Param("time") Date time, @Param("coachId") long coachId);

    @Query("select a from Appointment a where a.startTime > :time AND a.coach.id = :customerId")
    public List<Appointment> getCustomerFuthureAppointments(@Param("time") Date time, @Param("customerId") long customerId);
}
