package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Product;
import com.mercury.finalserver.bean.ProductEffect;
import com.mercury.finalserver.dao.ProductDao;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public Response getAllProducts(){
        return productService.getAllProducts();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}/edit-effect")
    public Response editProductEffet(@Valid @RequestBody ProductEffect productEffect, @PathVariable long id) {
        // TODO: stub
        return null;
    }
}
