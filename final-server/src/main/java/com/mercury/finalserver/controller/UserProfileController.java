package com.mercury.finalserver.controller;

import com.mercury.finalserver.dao.UserProfileDao;
import com.mercury.finalserver.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserProfileController {
    @Autowired
    UserProfileDao userProfileDao;

    @GetMapping("/coaches")
    public Response getAllCoaches() {
        return new Response(true, userProfileDao.findByType("ROLE_COACH").get(0).getUsers());
    }
}
