/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.topKaizen.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "topkaizen")
public class TopKaizen implements Serializable {

    @Id
    @Column(name = "index_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int indexNo;
    
    @Column(name = "month")
    private Date date;
    
    @Column(name = "epf_no")
    private String epfNo;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "department")
    private String department;

    public TopKaizen() {
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getEpfNo() {
        return epfNo;
    }

    public void setEpfNo(String epfNo) {
        this.epfNo = epfNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "TopKaizen{" + "indexNo=" + indexNo + ", date=" + date + ", epfNo=" + epfNo + ", name=" + name + ", department=" + department + '}';
    }
    
    
}
