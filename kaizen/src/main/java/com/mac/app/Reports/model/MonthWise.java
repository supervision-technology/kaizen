/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports.model;

/**
 *
 * @author Nidura Prageeth
 */
public class MonthWise {

    private String date;
    private String department;
    private String target;
    private String achieved;
    private String targetYear;
    private String company;

    public MonthWise() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getAchieved() {
        return achieved;
    }

    public void setAchieved(String achieved) {
        this.achieved = achieved;
    }
    
    public String getTargetYear() {
        return targetYear;
    }

    public void setTargetYear(String targetYear) {
        this.targetYear = targetYear;
    }
    

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
    

    @Override
    public String toString() {
        return "MonthWise{" + "date=" + date + ", department=" + department + ", target=" + target + ", achieved=" + achieved + ", targetYear=" + targetYear + '}';
    }
    

}
