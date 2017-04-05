/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen;

import com.mac.app.kaizen.model.TKaizen;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface KaizenRepository extends JpaRepository<TKaizen, Integer>{

    public List<TKaizen> findByEmployee(Integer indexNo);

    
}
