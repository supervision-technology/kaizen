/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen;

import com.mac.app.kaizen.model.TKaizen;
import java.util.Date;
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
public class KaizenService {

    @Autowired
    private KaizenRepository kaizenRepository;

    public List<TKaizen> allKaisen() {
        return kaizenRepository.findAll();
    }

    public TKaizen saveKazen(TKaizen kaizen) {
        System.out.println(kaizen.getEmployeeCost());
        kaizen.setEmployee(1);
        kaizen.setIntroduceDate(new Date());
        kaizen.setReviewStatus("PENDING");
        return kaizenRepository.save(kaizen);
    }

}
