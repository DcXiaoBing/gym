package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.UserDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user-detail")
public class UserDetialController {
    @Autowired
    UserDetailService userDetailService;

//    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    @GetMapping
    public Response getUserDetail(Authentication authentication) {
        return userDetailService.getUserDetail(authentication);
    }

    @PutMapping
    public Response updateUserDetail(@RequestBody UserDetail userDetail, Authentication authentication) {
        return userDetailService.updateUserDetail(userDetail, authentication);
    }
}
