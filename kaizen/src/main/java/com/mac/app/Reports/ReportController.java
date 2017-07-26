/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.Currency;
import com.mac.app.Reports.model.MonthWise;
import java.util.List;
import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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
public class ReportController {

    @Autowired
    private ReportService reportService;

    @RequestMapping(value = "/summary/{year}/{company}", method = RequestMethod.GET)
    public List<Object[]> SummaryByYear(@PathVariable("year") String year,@PathVariable("company") String company) {
        return reportService.summary(year,company);
    }

    @RequestMapping(value = "/view-count/{year}/{month}/{company}", method = RequestMethod.GET)
    public List<Object[]> evaluatedAndManagerViewedDetails(@PathVariable("year") String year, @PathVariable("month") String month, @PathVariable("company") String company) {
        return reportService.viewCountDetails(year, month,company);
    }

    @RequestMapping(value = "/month-wise-details/{year}", method = RequestMethod.GET)
    public List<MonthWise> monthWiseDetailsByYear(@PathVariable("year") String year) {
        return reportService.monthWiseDetailsByYear(year);
    }

    @RequestMapping(value = "/top-kaizen/{year}/{month}/{company}", method = RequestMethod.GET)
    public List<Object[]> topKaizen(@PathVariable("year") String year, @PathVariable("month") String month,@PathVariable("company") String company) {
        return reportService.topKaizen(year, month,company);
    }

    @RequestMapping(value = "/top-10-kaizen/{year}/{month}/{company}", method = RequestMethod.GET)
    public List<Object[]> top10Kaizen(@PathVariable("year") String year, @PathVariable("month") String month,@PathVariable("company") String company) {
        return reportService.top10Kaizen(year, month,company);
    }

    @RequestMapping(value = "/cost-saving/{year}/{month}/{company}", method = RequestMethod.GET)
    public List<Object[]> costSaving(@PathVariable("year") String year, @PathVariable("month") String month,@PathVariable("company") String company) {
        return reportService.costSaving(year, month,company);
    }

    //// currency
    @RequestMapping(value = "/save-currency/{value}", method = RequestMethod.POST)
    public Currency saveCurrency(@PathVariable String  value) {
        System.out.println(value);
        return reportService.saveCurrency(value);
    }

    @RequestMapping(value = "/all-currency", method = RequestMethod.GET)
    public List<Currency> allCurrency() {
        return reportService.allCurrency();
    }

}
