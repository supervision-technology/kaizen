/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.branch;

import com.mac.app.branch.model.Branch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author my
 */
@RestController
@CrossOrigin
@RequestMapping("/api/branch")
public class BranchController {
    
    @Autowired
    private BranchService branchService; 
    
    @RequestMapping(value = "/{company}",method = RequestMethod.GET)
    public List<Branch> allBranch(@PathVariable int company) {
        return branchService.findByCompany(company);
    }

    @RequestMapping(value = "/save-branch", method = RequestMethod.POST)
    public Branch saveBranch(@RequestBody Branch branch) {
        return branchService.saveBranch(branch);
    }
    
      @RequestMapping(value = "/delete-branch/{indexNo}", method = RequestMethod.DELETE)
    public void deleteEmployee(@PathVariable Integer indexNo) {
        branchService.deleteBranch(indexNo);
    }
}
