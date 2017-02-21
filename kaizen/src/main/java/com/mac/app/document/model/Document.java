/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.document.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "document")
public class Document implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer indexNo;

    @NotNull
    @Column(name = "path")
    private byte[] path;

    @Column(name = "kaizen")
    private int kaizen;

    public Document() {
    }

    public Document(Integer indexNo, byte[] path, int kaizen) {
        this.indexNo = indexNo;
        this.path = path;
        this.kaizen = kaizen;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public byte[] getPath() {
        return path;
    }

    public void setPath(byte[] path) {
        this.path = path;
    }

    public int getKaizen() {
        return kaizen;
    }

    public void setKaizen(int kaizen) {
        this.kaizen = kaizen;
    }

   
    
    

}
