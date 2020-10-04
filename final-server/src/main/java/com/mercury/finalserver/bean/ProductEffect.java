package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "msi_product_effect")
public class ProductEffect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id;

    @Column
    private String description;

    @Column(name = "class_count")
    private int classCount;

    @Column(name = "ticket_count")
    private int ticketCount;

    @Column(name = "training_count")
    private int trainingCount;

    @Column(name = "membership_days")
    private int membershipDays; // increase certain days of membership

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getMembershipDays() {
        return membershipDays;
    }

    public void setMembershipDays(int membershipDays) {
        this.membershipDays = membershipDays;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getClassCount() {
        return classCount;
    }

    public void setClassCount(int classCount) {
        this.classCount = classCount;
    }
}
