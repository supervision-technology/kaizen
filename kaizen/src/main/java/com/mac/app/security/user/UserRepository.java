/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.security.user;

import com.mac.app.employee.model.Employee;
import com.mac.app.security.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Employee, Integer>{

    public Employee findByNameAndEpfNo(String name, String epfNo);
    
    
//    public User findByName()

//    public User findByName(String name);
}
