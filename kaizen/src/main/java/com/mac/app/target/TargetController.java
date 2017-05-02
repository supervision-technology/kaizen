/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.target;

import com.mac.app.target.model.Target;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/api/kaizen")
public class TargetController {

    @Autowired
    private TargetService targetService;

    @RequestMapping(value = "/kaizen-target", method = RequestMethod.GET)
    public List<Target> allKaizenTarget() {
        return targetService.allKaizenTarget();
    }
    
    @RequestMapping(value = "/save-kaizen-target",method = RequestMethod.POST)
    public Target saveKaizenTarget(@RequestBody Target target){
        return targetService.saveKaizenTarget(target);
    }
    
}
