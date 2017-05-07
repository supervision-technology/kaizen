/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen.model;

import java.io.Serializable;

/**
 *
 * @author Nidura Prageeth
 */
public class Mail implements Serializable{
    
    private String email;
    private String message;
    private String subject;
    private int indexNo;
    private String managerCost;
    private String managerCreativity;
    private String managerQuality;
    private String managerSafety;
    private String managerUtilization;

    public Mail() {
    }

    public Mail(String email, String message, String subject, int indexNo, String managerCost, String managerCreativity, String managerQuality, String managerSafety, String managerUtilization) {
        this.email = email;
        this.message = message;
        this.subject = subject;
        this.indexNo = indexNo;
        this.managerCost = managerCost;
        this.managerCreativity = managerCreativity;
        this.managerQuality = managerQuality;
        this.managerSafety = managerSafety;
        this.managerUtilization = managerUtilization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public String getManagerCost() {
        return managerCost;
    }

    public void setManagerCost(String managerCost) {
        this.managerCost = managerCost;
    }

    public String getManagerCreativity() {
        return managerCreativity;
    }

    public void setManagerCreativity(String managerCreativity) {
        this.managerCreativity = managerCreativity;
    }

    public String getManagerQuality() {
        return managerQuality;
    }

    public void setManagerQuality(String managerQuality) {
        this.managerQuality = managerQuality;
    }

    public String getManagerSafety() {
        return managerSafety;
    }

    public void setManagerSafety(String managerSafety) {
        this.managerSafety = managerSafety;
    }

    public String getManagerUtilization() {
        return managerUtilization;
    }

    public void setManagerUtilization(String managerUtilization) {
        this.managerUtilization = managerUtilization;
    }

    @Override
    public String toString() {
        return "Mail{" + "email=" + email + ", message=" + message + ", subject=" + subject + ", indexNo=" + indexNo + ", managerCost=" + managerCost + ", managerCreativity=" + managerCreativity + ", managerQuality=" + managerQuality + ", managerSafety=" + managerSafety + ", managerUtilization=" + managerUtilization + '}';
    }

   
   
    
}
