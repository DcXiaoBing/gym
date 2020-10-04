package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Product;
import com.mercury.finalserver.bean.ProductEffect;
import com.mercury.finalserver.dao.ProductDao;
import com.mercury.finalserver.dao.ProductEffectDao;
import com.mercury.finalserver.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class ProductEffectService {

    @Autowired
    ProductEffectDao productEffectDao;

    public Response addProductEffect(ProductEffect productEffect) {
        try{
            ProductEffect pe = productEffectDao.save(productEffect);
            return new Response(true, pe);
        } catch (Exception e) {
            return new Response(false);
        }
    }
}
