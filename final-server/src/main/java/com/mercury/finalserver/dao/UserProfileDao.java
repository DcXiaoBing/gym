package com.mercury.finalserver.dao;

import java.util.List;

import com.mercury.finalserver.bean.UserProfile;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileDao extends JpaRepository<UserProfile, Long> {
    List<UserProfile> findByType(String type);
}