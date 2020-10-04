package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.*;
import com.mercury.finalserver.dao.*;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class OrderService {
    @Autowired
    OrderDao orderDao;
    @Autowired
    ProductDao productDao;
    @Autowired
    OrderProductDao orderProductDao;
    @Autowired
    UserDao userDao;
    @Autowired
    UserDetailDao userDetailDao;

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    public Response addOrder(Order order, Authentication authentication) {
        try{
            User user = userDao.findByUsername(authentication.getName());
            UserDetail ud = user.getUserDetail();
            if(ud == null) {
                ud = new UserDetail();
                ud.setUser(user);
            }
            Date cur = new Date();

            Set<OrderProduct> purchases = order.getPurchases();
            for(OrderProduct orderProduct : purchases) {
                Product product = (Product) productDao.findById(orderProduct.getProduct().getId()).get();
                orderProduct.setProduct(product);
                orderProduct.setOrder(order);
                ud.setTicketCount(ud.getTicketCount() + product.getEffect().getTicketCount() * orderProduct.getQuantity());
                ud.setClassCount(ud.getClassCount() + product.getEffect().getClassCount() * orderProduct.getQuantity());
                ud.setTrainingCount(ud.getTrainingCount() + product.getEffect().getTrainingCount() * orderProduct.getQuantity());

                if(ud.getMembershipEnd() == null || ud.getMembershipEnd().compareTo(cur) < 0) {
                    ud.setMembershipEnd(new Date(cur.getTime() + 1000L * 3600 * 24 * 30));
                } else {
                    ud.setMembershipEnd(new Date(ud.getMembershipEnd().getTime() + 1000L * 3600 * 24 * 30));
                }
            }


            order.setUser(user);
            order.setPurchases(purchases);
            orderDao.save(order);
            userDao.save(user);
            userDetailDao.save(ud);

            return new Response(true, order); // return order
        } catch (Exception e) {
            return new Response(false, "add order failed");
        }
    }

    public Response getAllOrders(Authentication authentication) {
        if(SecurityUtils.isAdmin(authentication.getAuthorities())) {
            return new Response(true, orderDao.findAll());
        } else {
            return new Response(true, userDao.findByUsername(authentication.getName()).getOrders());
        }
    }

    public Response getTodayOrder(Date start) {
        Date end = new Date(start.getTime() + 24 * 3600 * 1000L);

        LOGGER.info(start.toString());
        LOGGER.info(end.toString());
        LOGGER.info("*************");

        return new Response(true, orderDao.getTodayOrder(start, end));
    }
}
