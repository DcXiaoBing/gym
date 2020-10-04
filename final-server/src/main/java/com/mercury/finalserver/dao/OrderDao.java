package com.mercury.finalserver.dao;

import java.util.Date;
import java.util.List;

import com.mercury.finalserver.bean.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDao extends JpaRepository<Order, Long> {
    public List<Order> findByUserId(long id);

    @Query("select order from Order order where order.purchase_date >= :start and order.purchase_date < :end")
    List<Order> getTodayOrder(@Param("start") Date begin, @Param("end") Date end);
}
