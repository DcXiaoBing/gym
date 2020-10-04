package com.mercury.finalserver.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.bean.UserProfile;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.dao.UserDetailDao;
import com.mercury.finalserver.dao.UserProfileDao;
import com.mercury.finalserver.http.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDao userDao;
    @Autowired
    private UserProfileDao userProfileDao;
    @Autowired
    private UserDetailDao userDetailDao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public Response register(User user) {
        LOGGER.info(user.toString());
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // common user profile id will set to msi_user
            Set<UserProfile> profiles = new HashSet<>();
            LOGGER.info(userProfileDao.findByType("ROLE_CUSTOMER").toString());
            profiles.add(userProfileDao.findByType("ROLE_CUSTOMER").get(0)); // we can ensure the existence
            user.setProfiles(profiles);

            userDao.save(user); // return the object saved

            User nu = userDao.findByUsername(user.getUsername());
            LOGGER.info(nu.toString());

            UserDetail ud = new UserDetail();
            ud.setUser(nu); // 有外键的存

            // TODO: send email

            userDetailDao.save(ud);

            return new Response(true);
        } catch (Exception e) {
            return new Response(false, 400, e.getMessage());
        }
    }

    public Response changePassword(User user, Authentication authentication) {
        // TODO: allow admin to change any account's passowrd

        if (user.getUsername().equals(authentication.getName())) {
            User u = userDao.findByUsername(user.getUsername());
            u.setPassword(passwordEncoder.encode(user.getPassword()));
            userDao.save(u);

            return new Response(true);
        }
        return new Response(false, "Have no authoriz to update password!");
    }

    public Response deleteUser(long id) {
        if (userDao.findById(id).get() != null) {
            userDao.deleteById(id);
            return new Response(true);
        } else {
            return new Response(false, "user not exist!");
        }
    }

    public Response addEmployee(User user, String type) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            Set<UserProfile> profiles = new HashSet<>();

            profiles.add(userProfileDao.findByType("ROLE_COACH").get(0)); // we can ensure the existence
            user.setProfiles(profiles);

            userDao.save(user); // return the object saved
            return new Response(true);
        } catch (Exception e) {
            return new Response(false, 400, e.getMessage());
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDao.findByUsername(username);
    }
}
