package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product, Long> {
    // TODO: might add product to cache


}
