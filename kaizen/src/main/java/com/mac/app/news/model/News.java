/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.news.model;

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
@Table(name = "news_feed")
public class News implements Serializable{
    
       
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    private int IndexNo;

    @Column(name = "remark")
    private String remark;
    
    @Column(name = "file")
    private String file;

    public News() {
    }

    public News(int IndexNo, String remark, String file) {
        this.IndexNo = IndexNo;
        this.remark = remark;
        this.file = file;
    }


    public int getIndexNo() {
        return IndexNo;
    }

    public void setIndexNo(int IndexNo) {
        this.IndexNo = IndexNo;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
    
    
}
