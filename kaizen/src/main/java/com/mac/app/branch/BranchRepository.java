/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.branch;

import com.mac.app.branch.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface BranchRepository extends JpaRepository<Branch, Integer>{
    
}
