package com.mercury.finalserver.controller;

import java.util.List;

import javax.validation.Valid;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    UserService userService;

    // TODO: add authorization
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // When Spring Boot finds an argument annotated with @Valid, it automatically bootstraps the default JSR 380 implementation — Hibernate Validator — and validates the argument.
    // 用在bean中定义的validator来验证这个传入的object
    @PostMapping
    public Response addUser(@Valid @RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/{type}")
    public Response addCoach(@Valid @RequestBody User user, @PathVariable String type) {
        return userService.addEmployee(user, type);
    }

    // Authentication token will be resolved by SpringBoot
    // So we don't need to pass in
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping
    public Response changePassword(@RequestBody User user, Authentication authentication) {
        return userService.changePassword(user, authentication);
    }

    @DeleteMapping("/{id}")
    public Response deleteUser(@PathVariable long id) {
        return userService.deleteUser(id);
    }
}
