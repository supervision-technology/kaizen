/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen.model;

import com.mac.app.employee.model.Employee;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "kaizen")
public class TKaizen implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer indexNo;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "introduce_date")
    private Date introduceDate;

    @Column(name = "type")
    private String type;

    @Column(name = "review_status")
    private String reviewStatus;

    @Column(name = "employee_complete")
    private String employeeComplete;

    @Column(name = "manager_complete")
    private String managerComplete;
    
    @Column(name = "committee_complete")
    private String committeeComplete;

    @Column(name = "appreciation")
    private String appreciation;

    @Column(name = "suggestion")
    private String suggestion;

    @Column(name = "employee")
    private int employee;

    @Column(name = "employee_cost")
    private String employeeCost;

    @Column(name = "employee_utilization")
    private String employeeUtilization;

    @Column(name = "employee_creativity")
    private String employeeCreativity;

    @Column(name = "employee_safety")
    private String employeeSafety;

    @Column(name = "employee_quality")
    private String employeeQuality;

    @Column(name = "manager_cost")
    private String managerCost;

    @Column(name = "manager_utilization")
    private String managerUtilization;

    @Column(name = "manager_creativity")
    private String managerCreativity;

    @Column(name = "manager_safety")
    private String managerSafety;

    @Column(name = "manager_quality")
    private String managerQuality;

    @Column(name = "committee_cost")
    private String committeeCost;

    @Column(name = "committee_utilization")
    private String committeeUtilization;

    @Column(name = "committee_creativity")
    private String committeeCreativity;

    @Column(name = "committee_safety")
    private String committeeSafety;

    @Column(name = "committee_quality")
    private String committeeQuality;

    @Column(name = "actual_cost")
    private Double actualCost;
  
    @Column(name = "company")
    private int company;
    
    @Column(name = "manager_actual_cost")
    private Double managerActualCost;
  
    @Column(name = "committee_actual_cost")
    private Double committeeActualCost;
    
    
    

    public TKaizen() {
    }

    public TKaizen(Integer indexNo, String title, String description, Date introduceDate, String type, String reviewStatus, String employeeComplete, String managerComplete, String committeeComplete, String appreciation, String suggestion, int employee, String employeeCost, String employeeUtilization, String employeeCreativity, String employeeSafety, String employeeQuality, String managerCost, String managerUtilization, String managerCreativity, String managerSafety, String managerQuality, String committeeCost, String committeeUtilization, String committeeCreativity, String committeeSafety, String committeeQuality, Double actualCost, int company, Double managerActualCost, Double committeeActualCost) {
        this.indexNo = indexNo;
        this.title = title;
        this.description = description;
        this.introduceDate = introduceDate;
        this.type = type;
        this.reviewStatus = reviewStatus;
        this.employeeComplete = employeeComplete;
        this.managerComplete = managerComplete;
        this.committeeComplete = committeeComplete;
        this.appreciation = appreciation;
        this.suggestion = suggestion;
        this.employee = employee;
        this.employeeCost = employeeCost;
        this.employeeUtilization = employeeUtilization;
        this.employeeCreativity = employeeCreativity;
        this.employeeSafety = employeeSafety;
        this.employeeQuality = employeeQuality;
        this.managerCost = managerCost;
        this.managerUtilization = managerUtilization;
        this.managerCreativity = managerCreativity;
        this.managerSafety = managerSafety;
        this.managerQuality = managerQuality;
        this.committeeCost = committeeCost;
        this.committeeUtilization = committeeUtilization;
        this.committeeCreativity = committeeCreativity;
        this.committeeSafety = committeeSafety;
        this.committeeQuality = committeeQuality;
        this.actualCost = actualCost;
        this.company = company;
        this.managerActualCost = managerActualCost;
        this.committeeActualCost = committeeActualCost;
    }

    

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getIntroduceDate() {
        return introduceDate;
    }

    public void setIntroduceDate(Date introduceDate) {
        this.introduceDate = introduceDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(String reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public String getEmployeeComplete() {
        return employeeComplete;
    }

    public void setEmployeeComplete(String employeeComplete) {
        this.employeeComplete = employeeComplete;
    }

    public String getManagerComplete() {
        return managerComplete;
    }

    public void setManagerComplete(String managerComplete) {
        this.managerComplete = managerComplete;
    }

    public String getCommitteeComplete() {
        return committeeComplete;
    }

    public void setCommitteeComplete(String committeeComplete) {
        this.committeeComplete = committeeComplete;
    }

    public String getAppreciation() {
        return appreciation;
    }

    public void setAppreciation(String appreciation) {
        this.appreciation = appreciation;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public int getEmployee() {
        return employee;
    }

    public void setEmployee(int employee) {
        this.employee = employee;
    }

    public String getEmployeeCost() {
        return employeeCost;
    }

    public void setEmployeeCost(String employeeCost) {
        this.employeeCost = employeeCost;
    }

    public String getEmployeeUtilization() {
        return employeeUtilization;
    }

    public void setEmployeeUtilization(String employeeUtilization) {
        this.employeeUtilization = employeeUtilization;
    }

    public String getEmployeeCreativity() {
        return employeeCreativity;
    }

    public void setEmployeeCreativity(String employeeCreativity) {
        this.employeeCreativity = employeeCreativity;
    }

    public String getEmployeeSafety() {
        return employeeSafety;
    }

    public void setEmployeeSafety(String employeeSafety) {
        this.employeeSafety = employeeSafety;
    }

    public String getEmployeeQuality() {
        return employeeQuality;
    }

    public void setEmployeeQuality(String employeeQuality) {
        this.employeeQuality = employeeQuality;
    }

    public String getManagerCost() {
        return managerCost;
    }

    public void setManagerCost(String managerCost) {
        this.managerCost = managerCost;
    }

    public String getManagerUtilization() {
        return managerUtilization;
    }

    public void setManagerUtilization(String managerUtilization) {
        this.managerUtilization = managerUtilization;
    }

    public String getManagerCreativity() {
        return managerCreativity;
    }

    public void setManagerCreativity(String managerCreativity) {
        this.managerCreativity = managerCreativity;
    }

    public String getManagerSafety() {
        return managerSafety;
    }

    public void setManagerSafety(String managerSafety) {
        this.managerSafety = managerSafety;
    }

    public String getManagerQuality() {
        return managerQuality;
    }

    public void setManagerQuality(String managerQuality) {
        this.managerQuality = managerQuality;
    }

    public String getCommitteeCost() {
        return committeeCost;
    }

    public void setCommitteeCost(String committeeCost) {
        this.committeeCost = committeeCost;
    }

    public String getCommitteeUtilization() {
        return committeeUtilization;
    }

    public void setCommitteeUtilization(String committeeUtilization) {
        this.committeeUtilization = committeeUtilization;
    }

    public String getCommitteeCreativity() {
        return committeeCreativity;
    }

    public void setCommitteeCreativity(String committeeCreativity) {
        this.committeeCreativity = committeeCreativity;
    }

    public String getCommitteeSafety() {
        return committeeSafety;
    }

    public void setCommitteeSafety(String committeeSafety) {
        this.committeeSafety = committeeSafety;
    }

    public String getCommitteeQuality() {
        return committeeQuality;
    }

    public void setCommitteeQuality(String committeeQuality) {
        this.committeeQuality = committeeQuality;
    }

    public Double getActualCost() {
        return actualCost;
    }

    public void setActualCost(Double actualCost) {
        this.actualCost = actualCost;
    }

    public int getCompany() {
        return company;
    }

    public void setCompany(int company) {
        this.company = company;
    }

    public Double getManagerActualCost() {
        return managerActualCost;
    }

    public void setManagerActualCost(Double managerActualCost) {
        this.managerActualCost = managerActualCost;
    }

    public Double getCommitteeActualCost() {
        return committeeActualCost;
    }

    public void setCommitteeActualCost(Double committeeActualCost) {
        this.committeeActualCost = committeeActualCost;
    }

    @Override
    public String toString() {
        return "TKaizen{" + "indexNo=" + indexNo + ", title=" + title + ", description=" + description + ", introduceDate=" + introduceDate + ", type=" + type + ", reviewStatus=" + reviewStatus + ", employeeComplete=" + employeeComplete + ", managerComplete=" + managerComplete + ", committeeComplete=" + committeeComplete + ", appreciation=" + appreciation + ", suggestion=" + suggestion + ", employee=" + employee + ", employeeCost=" + employeeCost + ", employeeUtilization=" + employeeUtilization + ", employeeCreativity=" + employeeCreativity + ", employeeSafety=" + employeeSafety + ", employeeQuality=" + employeeQuality + ", managerCost=" + managerCost + ", managerUtilization=" + managerUtilization + ", managerCreativity=" + managerCreativity + ", managerSafety=" + managerSafety + ", managerQuality=" + managerQuality + ", committeeCost=" + committeeCost + ", committeeUtilization=" + committeeUtilization + ", committeeCreativity=" + committeeCreativity + ", committeeSafety=" + committeeSafety + ", committeeQuality=" + committeeQuality + ", actualCost=" + actualCost + ", company=" + company + ", managerActualCost=" + managerActualCost + ", committeeActualCost=" + committeeActualCost + '}';
    }
   
    
    

    
}
