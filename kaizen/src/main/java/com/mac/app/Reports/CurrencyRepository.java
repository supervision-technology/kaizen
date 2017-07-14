/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface CurrencyRepository extends JpaRepository<Currency, Integer>{
    
}
