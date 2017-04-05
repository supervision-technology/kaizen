/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.employee.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer indexNo;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "epf_no")
    private String epfNo;

    @NotNull
    @Column(name = "type")
    private String type;

    @Column(name = "email")
    private String email;

    
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "department")
    private Department department;
    

    public Employee() {
        
    }

    public Employee(Integer indexNo, String name, String epfNo, String type, String email, Department department) {
        this.indexNo = indexNo;
        this.name = name;
        this.epfNo = epfNo;
        this.type = type;
        this.email = email;
        this.department = department;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEpfNo() {
        return epfNo;
    }

    public void setEpfNo(String epfNo) {
        this.epfNo = epfNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

   
    
  
}
