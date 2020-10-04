package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.dao.UserDetailDao;
import com.mercury.finalserver.http.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    UserDao userDao;
    @Autowired
    UserDetailDao userDetailDao;

    public Response getUserDetail(Authentication authentication) {
        User user = userDao.findByUsername(authentication.getName());
        return new Response(true, user.getUserDetail());
    }

    public Response addUserDetail(UserDetail userDetail, Authentication authentication) {
        User user = userDao.findByUsername(authentication.getName());
        userDetail.setUser(user);

        return new Response(true, userDetailDao.save(userDetail));
    }

    public Response updateUserDetail(UserDetail userDetail, Authentication authentication) {
        User user = userDao.findByUsername(authentication.getName());
//        LOGGER.info("new " + userDetail.toString());
//        if(user.getUserDetail() != null)
//            LOGGER.info(user.getUserDetail().toString());
        if(user.getUserDetail() == null) { // if this is first time user update his detail
            return addUserDetail(userDetail, authentication);
        } else {
            // UserDetail ud = userDetailDao.findById(userDetail.getId()).get();
            UserDetail ud = user.getUserDetail();
            userDetail.setUser(ud.getUser());
            ud = userDetail;
            return new Response(true, userDetailDao.save(ud));
        }
    }
}
