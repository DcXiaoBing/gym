package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.IndoorClass;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.dao.IndoorClassDao;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.dao.UserDetailDao;
import com.mercury.finalserver.http.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Iterator;

@Service
@Transactional
public class IndoorClassService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    IndoorClassDao indoorClassDao;

    @Autowired
    UserDao userDao;

    @Autowired
    UserDetailDao userDetailDao;

    public Response getAllClasses() {
        return new Response(true, indoorClassDao.findAll());
    }

    public Response getAllRegisteredClass(Authentication authentication) {
        try{
            User user = userDao.findByUsername(authentication.getName());
            return new Response(true, user.getClasses());
        } catch (Exception e) {
            return new Response(false, "fetch registered class failed");
        }
    }

    public Response getTodayClass(Date date) {
        return new Response(true, indoorClassDao.findByDate(date));
    }

    public Response getFuthureClass(Date date) {
        return new Response(true, indoorClassDao.getFutureClasses(date));
    }

    public Response registerClass(IndoorClass indoorClass, Authentication authentication) {
        try{
            IndoorClass id = indoorClassDao.findById(indoorClass.getId()).get();

            User user = userDao.findByUsername(authentication.getName());

            UserDetail ud = user.getUserDetail();
            if(ud == null) {
                ud = new UserDetail();
                ud.setUser(user);
                userDetailDao.save(ud);
            }

            if(ud.getClassCount() < 1) {
                return new Response(false, "not enough count");
            }

            ud.setClassCount(ud.getClassCount() - 1);
            id.getStudents().add(user);
            user.getClasses().add(id);

            userDao.save(user);
            userDetailDao.save(ud);
            indoorClassDao.save(id);

            return new Response(true, "register success");
        } catch (Exception e) {
            return new Response(false, "register failed");
        }
    }

    public Response addClass(IndoorClass indoorClass) {
        return new Response(true, indoorClassDao.save(indoorClass));
    }

    public Response editClass(IndoorClass indoorClass) {
        IndoorClass id = indoorClassDao.findById(indoorClass.getId()).get();

        id.setName(indoorClass.getName());
        id.setDate(indoorClass.getDate());
        id.setStartTime(indoorClass.getStartTime());
        id.setEndTime(indoorClass.getEndTime());

        indoorClassDao.save(id);

        return new Response(true, id);
    }

    public Response deleteClass(long id) {
        indoorClassDao.deleteById(id);
        return new Response(true, id);
    }

    public Response cancelSchedule(long id, Authentication authentication) {
        try {
            IndoorClass indoorClass = indoorClassDao.findById(id).get();
            User user = userDao.findByUsername(authentication.getName());

            Iterator<IndoorClass> it = user.getClasses().iterator();
            while(it.hasNext()) {
                IndoorClass temp = it.next();
                if(temp.getId() == id) {
                    it.remove();
                }
            }

            Iterator<User> it2 = indoorClass.getStudents().iterator();
            while(it2.hasNext()) {
                User temp = it2.next();
                if(temp.getId() == user.getId()) it2.remove();
            }

            userDao.save(user);
            indoorClassDao.save(indoorClass);

            return new Response(true, indoorClass);
        } catch (Exception e) {
            return new Response(false, "cancel failed");
        }
    }
}
