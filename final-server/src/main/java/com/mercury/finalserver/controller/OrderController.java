package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Order;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    @GetMapping
    public Response getAllOrder(Authentication authentication) {
        return orderService.getAllOrders(authentication);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    @PostMapping
    public Response addOrder(@Valid @RequestBody Order order, Authentication authentication) {
        return orderService.addOrder(order, authentication);
    }

    @GetMapping("/{timestamp}")
    public Response getTodayOrder(@PathVariable long timestamp) {
        return orderService.getTodayOrder(new Date(timestamp));
    }

    @DeleteMapping("/{id}")
    public Response deleteOrder(@PathVariable long id) {
        // TODO:
        return null;
    }
}
