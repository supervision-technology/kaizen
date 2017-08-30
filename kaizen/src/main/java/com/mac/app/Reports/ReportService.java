/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.Currency;
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

    @Autowired
    private CurrencyRepository currencyRepository;

    public List<Object[]> summary(String year,String company) {
        return reportRepository.AllSummary(year,company);
    }

    public List<Object[]> viewCountDetails(String year, String month,String company) {
        return reportRepository.viewCountDetails(year, month,company);
    }

    public List<MonthWise> monthWiseDetailsByYear(String year) {
        ArrayList<MonthWise> list = new ArrayList<>();

        List<Object[]> monthWiseDetail = reportRepository.monthWiseDetailByYear(year);
        for (Object[] objects : monthWiseDetail) {
            if (objects[0] == null) {
                objects[0] = "";
            }
            if (objects[3] == null) {
                objects[3] = "0";
            }
            MonthWise monthWise = new MonthWise();
            monthWise.setDate(objects[0].toString());
            monthWise.setDepartment(objects[1].toString());
            monthWise.setTarget(objects[2].toString());
            monthWise.setAchieved(objects[3].toString());
            monthWise.setTargetYear(objects[4].toString());
            monthWise.setCompany(objects[5].toString());

//            System.out.println(year + "this is target year");
//            if (year.equals(monthWise.getTargetYear())) {
//                System.out.println(monthWise.toString());
            list.add(monthWise);
//            }

        }
        return list;
    }

    public List<Object[]> topKaizen(String year, String month,String company) {
        return reportRepository.topKaizen(year, month,company);
    }

    public List<Object[]> top10Kaizen(String year, String month,String company) {
        return reportRepository.top10Kaizen(year, month,company);
    }

    public List<Object[]> costSaving(String year, String month,String company) {
        return reportRepository.costSaving(year, month,company);
    }

    // currency
    public Currency saveCurrency(String value) {
        List<Currency> findAll = currencyRepository.findAll();
        Currency c = new Currency();
        for (Currency currency : findAll) {
            currency.setValue(value);
            c = currencyRepository.save(currency);
        }
        return c;
    }

    public List<Currency> allCurrency() {
        return currencyRepository.findAll();
    }

}
