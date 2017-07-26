/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.branch;

import com.mac.app.branch.model.Branch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author my
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public List<Branch> allBranch() {
        return branchRepository.findAll();
    }

    public Branch saveBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public void deleteBranch(Integer indexNo) {
        branchRepository.delete(indexNo);
    }

    public List<Branch> findByCompany(int company) {
        return branchRepository.findByCompany(company);
    }
}
