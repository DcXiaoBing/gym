package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Product;
import com.mercury.finalserver.dao.ProductDao;
import com.mercury.finalserver.http.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Autowired
    ProductDao productDao;

    public Response getAllProducts() {
        try {
            List<Product> productList = productDao.findAll();
            return new Response(true, productList);
        } catch (Exception e) {
            LOGGER.info(e.toString());
            return new Response(false, "fetch products failed");
        }
    }

    public Response addProduct(Product product) {
        try{
            Product p = productDao.save(product);

            return new Response(true, p);
        } catch (Exception e) {
            return new Response(false, "add product fail");
        }
    }
}
