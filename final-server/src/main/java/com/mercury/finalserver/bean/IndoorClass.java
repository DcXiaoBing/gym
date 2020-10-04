package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "msi_indoor_class")
public class IndoorClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-4")
    @Column(name = "date")
    private Date date;

    @JsonFormat(timezone = "GMT-4")
    @Column(name = "start_time")
    private Time startTime;

    @JsonFormat(timezone = "GMT-4")
    @Column(name = "end_time")
    private Time endTime;

//    @Column(name = "max_customer")
//    private int maxCustomer;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "msi_classes_msi_user",
            joinColumns = {@JoinColumn(name = "class_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}
    )
    private Set<User> students;

//    @ManyToOne
//    @JoinColumn(name = "coach_id", referencedColumnName = "id")
//    private User coach;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

//    public int getMaxCustomer() {
//        return maxCustomer;
//    }
//
//    public void setMaxCustomer(int maxCustomer) {
//        this.maxCustomer = maxCustomer;
//    }

    public Set<User> getStudents() {
        return students;
    }

    public void setStudents(Set<User> customers) {
        this.students = customers;
    }

//    public User getCoach() {
//        return coach;
//    }
//
//    public void setCoach(User coach) {
//        this.coach = coach;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
