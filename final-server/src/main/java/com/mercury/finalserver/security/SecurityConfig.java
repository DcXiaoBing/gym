package com.mercury.finalserver.security;

import java.util.Arrays;

import com.mercury.finalserver.security.handler.*;
import com.mercury.finalserver.service.UserDetailService;
import com.mercury.finalserver.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.password.PasswordEncoder;

/*配置类 @Configuration*/
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityUtils.class);

    @Autowired
    UserService userDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationSuccessHandlerImpl authenticationSuccessHandler;
    @Autowired
    AuthenticationFailureHandlerImpl authenticationFailureHandler;
    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPoint;
    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandler;
    @Autowired
    LogoutSuccessHandlerImpl logoutSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .cors();// need to enable this to make configuration effective

        http.formLogin()
                .loginProcessingUrl("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);


        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler);

        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandler)
                .deleteCookies("JSESSIONID", "remember-me")
//                .invalidateHttpSession(true) // true by default
                .clearAuthentication(true);

        http.rememberMe()
                .rememberMeParameter("remember-me")
                .tokenValiditySeconds(14 * 24 * 60 * 60); // 14 days
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//      configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.addAllowedOrigin("*"); // You should only set trusted site here. e.g. http://localhost:8081 means only this site can access.
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
//    @Bean
//    public AuthenticationManager authManager() throws Exception {
//        return this.authenticationManager();
//    }

//
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
//@Bean
//public static ServletListenerRegistrationBean httpSessionEventPublisher() {
//    return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
//}
}
