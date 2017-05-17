/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.employee;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mac.app.employee.model.Department;
import com.mac.app.employee.model.Employee;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-S");

    @RequestMapping(method = RequestMethod.GET)
    public List<Employee> allEmployee() {
        return employeeService.allEmployee();
    }

    @RequestMapping(value = "/upload-employee", method = RequestMethod.POST)
    public Employee saveEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @RequestMapping(value = "/save-employee", method = RequestMethod.POST)
    public @ResponseBody
    Employee saveEmployee(@RequestPart("ad") String adString, @RequestPart("file") MultipartFile file) {

        Employee saveEmployee = new Employee();

        try {
            Employee jsonAd = new ObjectMapper().readValue(adString, Employee.class);

//            String fileName = dateFormat.format(new Date());
//            fileName = Base64.getEncoder().encodeToString(fileName.getBytes()) + file.getOriginalFilename();
            String fileName = dateFormat.format(new Date());
            fileName = file.getOriginalFilename();

            System.out.println(fileName);

            File uploadFile = new File("./files", fileName);
            if (!uploadFile.getParentFile().exists()) {
                uploadFile.getParentFile().mkdirs();
            }

            uploadFile.createNewFile();

            FileOutputStream fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(file.getBytes());

            saveEmployee = employeeService.saveEmployee(jsonAd);

        } catch (Exception a) {
            a.printStackTrace();
        }

        return saveEmployee;
    }

    @RequestMapping(value = "/delete-employee/{indexNo}", method = RequestMethod.DELETE)
    public void deleteEmployee(@PathVariable Integer indexNo) {
        employeeService.deleteEmployee(indexNo);
    }

    //department controllers
    @RequestMapping(value = "/all-department", method = RequestMethod.GET)
    public List<Department> allDepartment() {
        return employeeService.allDepartment();
    }

    @RequestMapping(value = "/delete-department/{indexNo}", method = RequestMethod.DELETE)
    public void deleteDepartment(@PathVariable Integer indexNo) {
        employeeService.deleteDepartment(indexNo);
    }

    @RequestMapping(value = "/save-department", method = RequestMethod.POST)
    public Department saveEmployee(@RequestBody Department department) {
        return employeeService.saveDepartment(department);
    }
}
