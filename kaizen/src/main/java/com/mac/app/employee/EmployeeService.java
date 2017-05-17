/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.employee;

import com.mac.app.employee.model.Department;
import com.mac.app.employee.model.Employee;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Employee> allEmployee() {
        return employeeRepository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getIndexNo() != null) {
            Employee findOne = employeeRepository.findOne(employee.getIndexNo());
            return employeeRepository.save(employee);
        } else {
            Employee user1 = employeeRepository.findByNameAndEpfNo(employee.getName(), employee.getEpfNo());
            if (user1 != null) {
                return null;
            } else {
                return employeeRepository.save(employee);
            }
        }
    }

    public void deleteEmployee(Integer indexNo) {
        employeeRepository.delete(indexNo);
    }

    // department methods
    public List<Department> allDepartment() {
        return departmentRepository.findAll();
    }

    public void deleteDepartment(Integer indexNo) {
        departmentRepository.delete(indexNo);
    }

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

}
