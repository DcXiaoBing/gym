package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.IndoorClass;
import com.mercury.finalserver.dao.IndoorClassDao;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.IndoorClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/classes")
public class IndoorClassController {

    @Autowired
    IndoorClassService indoorClassService;

    @GetMapping
    public Response getAllClasses() {
        return indoorClassService.getAllClasses();
    }

    @GetMapping("/{timestamp}")
    public Response getTodayClasses(@PathVariable(name = "timestamp") long timestamp) {
//        Date date = new Date(timestamp + 4 * 1000l * 3600); // MARK: make it more universal. offset timezone
        Date date = new Date(timestamp);
        return indoorClassService.getTodayClass(date);
    }

    @PostMapping
    public Response addIndoorClass(@Valid @RequestBody IndoorClass indoorClass) {
        return indoorClassService.addClass(indoorClass);
    }

    @PutMapping
    public Response editIndoorClass(@Valid @RequestBody IndoorClass indoorClass) {
        return indoorClassService.editClass(indoorClass);
    }
    @DeleteMapping("/{id}")
    public Response deleteIndoorClass(@PathVariable long id) {
        return indoorClassService.deleteClass(id);
    }

    @GetMapping("/future/{timestamp}")
    public Response getFuthureClasses(@PathVariable long timestamp) {
        Date date = new Date(timestamp);
        return indoorClassService.getFuthureClass(date);
    }

    @GetMapping("/register")
    public Response getRegisteredClasses(Authentication authentication) {
        return indoorClassService.getAllRegisteredClass(authentication);
    }

    @PostMapping("/register")
    public Response registerClass(@RequestBody IndoorClass indoorClass, Authentication authentication) {
        return indoorClassService.registerClass(indoorClass, authentication);
    }

    @PostMapping("/edit-register/{id}")
    public Response cancelSchedule(@PathVariable long id, Authentication authentication) {
        return indoorClassService.cancelSchedule(id, authentication);
    }
}
