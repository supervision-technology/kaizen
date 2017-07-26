/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.company;

import com.mac.app.company.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface CompanyRepository extends JpaRepository<Company,Integer>{
    
}
