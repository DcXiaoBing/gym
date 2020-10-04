package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "msi_product")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id;

    @Column
    @NotEmpty
    private String name;

    @Column
    @NotEmpty
    private String description;

    @Column
    @NotNull
    @Positive
    private Double price;

    // Gym's product is virtual product, so no need to store a stock
    // but add this for futhure extension
    @JsonIgnore
    @Column
    @PositiveOrZero
    private Integer stock;

    // save for future extension
    @JsonIgnore
    @Column
    private String image;

    // what we should do when user purchased one item of this product

    @JsonIgnore
    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private ProductEffect effect;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductEffect getEffect() {
        return effect;
    }

    public void setEffect(ProductEffect effect) {
        this.effect = effect;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
