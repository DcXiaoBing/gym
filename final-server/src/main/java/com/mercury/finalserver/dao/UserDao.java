package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

