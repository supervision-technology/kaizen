/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.target;

import com.mac.app.target.model.Target;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class TargetService {

    @Autowired
    private TargetRepository targetRepository;

    public List<Target> allKaizenTarget() {
        return targetRepository.findAll();
    }

    public Target saveKaizenTarget(Target target) {
        return targetRepository.save(target);
    }
}
