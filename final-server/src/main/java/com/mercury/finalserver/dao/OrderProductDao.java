package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.OrderProduct;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductDao extends JpaRepository<OrderProduct, Long> {
    
}
