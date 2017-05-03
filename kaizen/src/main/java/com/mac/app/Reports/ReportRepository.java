/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.Reports;

import com.mac.app.Reports.model.Target;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Nidura Prageeth
 */
public interface ReportRepository extends JpaRepository<Target, Integer> {

    @Query(value = "select\n"
            + " t.target_year ,\n"
            + " d.name ,\n"
            + " t.target ,\n"
            + " COUNT(k.index_no) as qty  \n"
            + "from \n"
            + " kaizen k ,\n"
            + " employee e,\n"
            + " department d ,\n"
            + " target t\n"
            + "where  \n"
            + " e.index_no=k.employee \n"
            + "and \n"
            + " e.department=d.index_no \n"
            + "and\n"
            + " d.index_no=t.department\n"
            + "and \n"
            + " k.review_status='MANAGER_VIEW'\n"
            + "and\n"
            + " YEAR(k.introduce_date) = YEAR(t.target_year)\n"
            + "group by \n"
            + " d.index_no", nativeQuery = true)
    public List<Object[]> AllSummary();

    @Query(value = "select\n"
            + "t.target_year ,\n"
            + "d.name ,\n"
            + "t.target,\n"
            + "count(k.review_status) as manager_view,\n"
            + "count(k.committee_complete) as Evaluated\n"
            + "from \n"
            + "kaizen k ,\n"
            + "employee e,\n"
            + "department d ,\n"
            + "target t\n"
            + "where  \n"
            + "e.index_no=k.employee \n"
            + "and \n"
            + "e.department=d.index_no \n"
            + "and\n"
            + "d.index_no=t.department \n"
            + "and \n"
            + "k.review_status='MANAGER_VIEW' \n"
            + "and \n"
            + "YEAR(k.introduce_date) = YEAR(t.target_year)\n"
            + "GROUP BY \n"
            + "d.index_no", nativeQuery = true)
    public List<Object[]> viewCountDetails();
}
