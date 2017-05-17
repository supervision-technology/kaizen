/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.topKaizen;

import com.mac.app.topKaizen.model.TopKaizen;
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
public class TopKaizenService {

    @Autowired
    private TopKaizenRepository topKaizenRepository;

    public List<TopKaizen> allTopKaizen() {
        return topKaizenRepository.findAll();
    }

    public TopKaizen saveTopKaizen(TopKaizen topKaizen) {
        TopKaizen kaizen = topKaizenRepository.findByDate(topKaizen.getDate());
        if (kaizen == null) {
            return topKaizenRepository.save(topKaizen);
        }
        return null;
    }

    public void deleteTopkaizen(Integer indexNo) {
        topKaizenRepository.delete(indexNo);
    }

    public List<TopKaizen> getTopKaizenByYear(String year) {
        return topKaizenRepository.findByYear(year);
    }
}
