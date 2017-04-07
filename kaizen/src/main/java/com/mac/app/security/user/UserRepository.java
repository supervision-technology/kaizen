/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.security.user;

import com.mac.app.security.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer>{

    public User findByNameAndPassword(String name, String password);
    
    
//    public User findByName()

    public User findByName(String name);
}
