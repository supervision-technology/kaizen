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

    public TKaizen() {
    }

    public TKaizen(Integer indexNo, String title, String description, Date introduceDate, String type, String reviewStatus, int employee, String employeeCost, String employeeUtilization, String employeeCreativity, String employeeSafety, String employeeQuality) {
        this.indexNo = indexNo;
        this.title = title;
        this.description = description;
        this.introduceDate = introduceDate;
        this.type = type;
        this.reviewStatus = reviewStatus;
        this.employee = employee;
        this.employeeCost = employeeCost;
        this.employeeUtilization = employeeUtilization;
        this.employeeCreativity = employeeCreativity;
        this.employeeSafety = employeeSafety;
        this.employeeQuality = employeeQuality;
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

    @Override
    public String toString() {
        return "TKaizen{" + "indexNo=" + indexNo + ", title=" + title + ", description=" + description + ", introduceDate=" + introduceDate + ", type=" + type + ", reviewStatus=" + reviewStatus + ", employee=" + employee + ", employeeCost=" + employeeCost + ", employeeUtilization=" + employeeUtilization + ", employeeCreativity=" + employeeCreativity + ", employeeSafety=" + employeeSafety + ", employeeQuality=" + employeeQuality + '}';
    }

}
