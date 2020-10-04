package com.mercury.finalserver.bean;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "msi_user_detail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id;

    @Column
    private String name;

    @Column
    private String phone;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd", timezone="GMT-4")
    private LocalDate birthday;

    @Column
    private String email;

    @Column
    private String address;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zip;

    @Column
    private String image;

    @Column(name = "ticket_count")
    private int ticketCount;

    @Column(name = "class_count")
    private int classCount;

    @Column(name = "training_count")
    private int trainingCount;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-4")
    private Date membershipEnd;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="USER_ID", referencedColumnName = "ID")
    private User user;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTicketCount() {
        return ticketCount;
    }

    public void setTicketCount(int ticketCount) {
        this.ticketCount = ticketCount;
    }

    public int getTrainingCount() {
        return trainingCount;
    }

    public void setTrainingCount(int trainingCount) {
        this.trainingCount = trainingCount;
    }

    public Date getMembershipEnd() {
        return membershipEnd;
    }

    public void setMembershipEnd(Date membershipEnd) {
        this.membershipEnd = membershipEnd;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getClassCount() {
        return classCount;
    }

    public void setClassCount(int classCount) {
        this.classCount = classCount;
    }

    @Override
    public String toString() {
        return "UserDetail{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", image='" + image + '\'' +
                ", ticketCount=" + ticketCount +
                ", trainingCount=" + trainingCount +
                ", membershipEnd=" + membershipEnd +
                ", user=" + user +
                '}';
    }
}
