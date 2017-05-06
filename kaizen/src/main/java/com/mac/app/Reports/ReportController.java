/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.MonthWise;
import java.util.List;
import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/summary/{year}", method = RequestMethod.GET)
    public List<Object[]> SummaryByYear(@PathVariable("year") String year) {
        return reportService.summary(year);
    }

    @RequestMapping(value = "/view-count/{year}", method = RequestMethod.GET)
    public List<Object[]> evaluatedAndManagerViewedDetails(@PathVariable("year") String year) {
        return reportService.viewCountDetails(year);
    }

    @RequestMapping(value = "/month-wise-details/{year}", method = RequestMethod.GET)
    public List<MonthWise> monthWiseDetailsByYear(@PathVariable("year") String year) {
        return reportService.monthWiseDetailsByYear(year);
    }
    
    @RequestMapping(value = "/top-kaizen/{year}/{month}",method = RequestMethod.GET)
    public List<Object[]> topKaizen(@PathVariable("year")String year,@PathVariable("month")String month){
        return reportService.topKaizen(year,month);
    }
    
    @RequestMapping(value = "/top-10-kaizen/{year}/{month}",method = RequestMethod.GET)
    public List<Object[]> top10Kaizen(@PathVariable("year")String year,@PathVariable("month")String month){
        return reportService.top10Kaizen(year,month);
    }

}
