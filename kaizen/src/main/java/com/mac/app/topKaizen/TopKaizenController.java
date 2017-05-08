/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.topKaizen;

import com.mac.app.topKaizen.model.TopKaizen;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
public class TopKaizenController {
    
    @Autowired
    private TopKaizenService topKaizenService;
    
    @RequestMapping(value = "/all-top-kaizen",method = RequestMethod.GET)
    public List<TopKaizen> allTopKaizen(){
        return topKaizenService.allTopKaizen();
    }
    
    
}
