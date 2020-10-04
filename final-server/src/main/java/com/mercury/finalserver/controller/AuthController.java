package com.mercury.finalserver.controller;

import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    AuthService authService;

    @GetMapping("/check-login")
    public Response checkLogin(Authentication authentication) {
        return authService.checkLogin(authentication);
    }
}
