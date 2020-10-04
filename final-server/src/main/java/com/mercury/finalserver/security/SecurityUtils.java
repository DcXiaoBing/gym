package com.mercury.finalserver.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.http.HttpServletResponse;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SecurityUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityUtils.class);
    private static final ObjectMapper mapper = new ObjectMapper();

    public static void sendResponse(HttpServletResponse httpServletResponse, int status, String message, Exception exception)
            throws IOException {
        Response response = new Response(exception == null ? true : false, status, message);
        flushResponse(httpServletResponse, response);
    }

    public static void sendAuthenticationSuccessResponse(HttpServletResponse httpServletResponse, int status, String message, Exception exception, User user)
            throws IOException {
        Response response = new Response(exception == null ? true : false, status, message, user);
//        System.out.println(response);
        LOGGER.info(user.toString());
        flushResponse(httpServletResponse, response);
    }

    public static void flushResponse(HttpServletResponse httpServletResponse, Response response) throws IOException {
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        httpServletResponse.setStatus(response.getCode());
        PrintWriter writer = httpServletResponse.getWriter();
        writer.write(mapper.writeValueAsString(response));
        writer.flush();
        writer.close();
    }

    public static boolean isAdmin(Collection<? extends GrantedAuthority> profiles) {
        boolean isAdmin = false;
        for(GrantedAuthority profle: profiles) {
            if(profle.getAuthority().equals("ROLE_ADMIN")) {
                isAdmin = true;
            }
        };
        return isAdmin;
    }

}
