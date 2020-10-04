package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.IndoorClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface IndoorClassDao extends JpaRepository<IndoorClass, Long> {

    @Query("select id from IndoorClass id where id.date = :date")
    List<IndoorClass> findByDate(@Param("date")Date date);

    @Query("select id from IndoorClass id where id.date >= :date")
    List<IndoorClass> getFutureClasses(@Param("date") Date date);
}
