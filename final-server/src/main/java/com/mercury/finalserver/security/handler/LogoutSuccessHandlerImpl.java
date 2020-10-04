package com.mercury.finalserver.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import com.mercury.finalserver.security.SecurityUtils;

@Component
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication arg2)
			throws IOException, ServletException {
//		Cookie cookie = new Cookie("remember-me",null);
//		cookie.setMaxAge(0);
//		cookie.setPath("/");
//		response.addCookie(cookie);
//		cookie = new Cookie("JSESSIONID",null);
//		cookie.setMaxAge(0);
//		cookie.setPath("/");
//		response.addCookie(cookie);
		SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, "Logout successfully.", null);
	}

}
