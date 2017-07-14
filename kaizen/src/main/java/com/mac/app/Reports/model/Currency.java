/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports.model;

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
@Table(name = "currency")
public class Currency implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "index_no")
    private int indexNo;
    
    @Column(name = "value")
    private String value;

    public Currency() {
    }

    public Currency(int indexNo, String value) {
        this.indexNo = indexNo;
        this.value = value;
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Currency{" + "indexNo=" + indexNo + ", value=" + value + '}';
    }

    
   
    
}
