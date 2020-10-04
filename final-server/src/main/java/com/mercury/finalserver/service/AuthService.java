package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public Response checkLogin(Authentication authentication) {
        if(authentication != null) {
            Response response = new Response(true, 200, "Logged In", (User)authentication.getPrincipal());
            return response;
        } else {
            return new Response(false);
        }
    }
}
