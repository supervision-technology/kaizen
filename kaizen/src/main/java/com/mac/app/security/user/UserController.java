/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.security.user;

import com.mac.app.employee.EmployeeRepository;
import com.mac.app.employee.model.Employee;
import com.mac.app.security.user.model.User;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
//@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;


//    @RequestMapping(path = "/user/login", method = RequestMethod.POST)
//    public User getUser(@RequestBody User user) {
//        return userRepository.findByNameAndPassword(user.getName(), user.getPassword());
//    }
    @RequestMapping(path = "/user/login", method = RequestMethod.POST)
    public Employee getUser(@RequestBody Employee user) {
        return userRepository.findByNameAndEpfNo(user.getName(), user.getEpfNo());
    }

//    @RequestMapping(path = "/save-user", method = RequestMethod.POST)
//    public User saveUser(@RequestBody User user) {
//        if (user.getIndexNo() != null) {
//            User findOne = userRepository.findOne(user.getIndexNo());
//            return userRepository.save(user);
//        } else {
//            User user1 = userRepository.findByNameAndPassword(user.getName(), user.getPassword());
//            if (user1 != null) {
//                return null;
//            } else {
//                return userRepository.save(user);
//            }
//        }
//    }
//
//    @RequestMapping(path = "/all-user", method = RequestMethod.GET)
//    public List<User> users() {
//        return userRepository.findAll();
//    }
//
//    @RequestMapping(path = "/delete-user/{indexNo}", method = RequestMethod.DELETE)
//    public int deleteUser(@PathVariable Integer indexNo) {
//        userRepository.delete(indexNo);
//        return indexNo;
//    }

}
