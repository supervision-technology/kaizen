/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.employee;

import com.mac.app.employee.model.Employee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

    public List<Employee> findByDepartmentIndexNo(Integer index);

    public Employee findByNameAndEpfNo(String name, String epfNo);

    public Employee findByEpfNo(String epfNo);
    
}
