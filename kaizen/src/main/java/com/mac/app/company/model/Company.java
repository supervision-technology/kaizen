/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.company.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author my
 */
@Entity
@Table(name = "company")
public class Company implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IndexNo;

    @Column(name = "name")
    private String name;

    public Company() {
    }

    public Company(int IndexNo, String name) {
        this.IndexNo = IndexNo;
        this.name = name;
    }

    public int getIndexNo() {
        return IndexNo;
    }

    public void setIndexNo(int IndexNo) {
        this.IndexNo = IndexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    
}
