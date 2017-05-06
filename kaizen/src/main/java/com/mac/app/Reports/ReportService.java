/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.MonthWise;
import java.lang.reflect.Array;
import java.math.BigInteger;
import java.util.ArrayList;
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
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Object[]> summary(String year) {
        return reportRepository.AllSummary(year);
    }

    public List<Object[]> viewCountDetails(String year) {
        return reportRepository.viewCountDetails(year);
    }

    public List<MonthWise> monthWiseDetailsByYear(String year) {
        ArrayList<MonthWise> list = new ArrayList<>();

        List<Object[]> monthWiseDetail = reportRepository.monthWiseDetailByYear(year);
        for (Object[] objects : monthWiseDetail) {
            MonthWise monthWise = new MonthWise();
            monthWise.setDate(objects[0].toString());
            monthWise.setDepartment(objects[1].toString());
            monthWise.setTarget(objects[2].toString());
            monthWise.setAchieved(objects[3].toString());
            list.add(monthWise);
        }
        return list;
    }

    public List<Object[]> topKaizen(String year, String month) {
        return reportRepository.topKaizen(year, month);
    }

    public List<Object[]> top10Kaizen(String year, String month) {
       return reportRepository.top10Kaizen(year, month);
    }

}
