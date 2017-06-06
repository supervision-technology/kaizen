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
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Nidura Prageeth
 */
public interface ReportRepository extends JpaRepository<Target, Integer> {

//    @Query(value = "select\n"
//            + " t.target_year ,\n"
//            + " d.name ,\n"
//            + " t.target ,\n"
//            + " COUNT(k.index_no) as qty  \n"
//            + "from \n"
//            + " kaizen k ,\n"
//            + " employee e,\n"
//            + " department d ,\n"
//            + " target t\n"
//            + "where  \n"
//            + " e.index_no=k.employee \n"
//            + "and \n"
//            + " e.department=d.index_no \n"
//            + "and\n"
//            + " d.index_no=t.department\n"
////            + "and \n"
////            + " k.review_status='MANAGER_VIEW'\n"
//            + "and\n"
//            + "YEAR(k.introduce_date) = YEAR(t.target_year)\n"
//            + "and \n"
//            + "YEAR(k.introduce_date)=:year \n"
//            + "group by \n"
//            + " d.index_no", nativeQuery = true)
//    public List<Object[]> AllSummary(@Param("year") String year);
    @Query(value = "SELECT\n"
            + "target.target_year,\n"
            + "department.name,\n"
            + "target.target, COUNT(kaizen.index_no) AS qty\n"
            + "FROM \n"
            + "target\n"
            + "LEFT JOIN department ON target.department = department.index_no\n"
            + "LEFT JOIN employee ON department.index_no= employee.department\n"
            + "LEFT JOIN kaizen ON kaizen.employee = employee.index_no\n"
            + "WHERE YEAR(target.target_year)=:year\n"
            + "GROUP BY department.index_no", nativeQuery = true)
    public List<Object[]> AllSummary(@Param("year") String year);

    @Query(value = "SELECT\n"
            + "target.target_year,\n"
            + "department.name,\n"
            + "target.target,\n"
            + "COUNT(kaizen.index_no) AS receved,\n"
            + "COUNT(kaizen.manager_complete ='MANAGER_COMPLETE') AS Evaluated\n"
            + "FROM \n"
            + "target\n"
            + "LEFT JOIN department ON target.department = department.index_no\n"
            + "LEFT JOIN employee ON department.index_no= employee.department\n"
            + "LEFT JOIN kaizen ON kaizen.employee = employee.index_no\n"
            + "WHERE  \n"
            + " YEAR(target.target_year)=:year \n"
            + "GROUP BY department.index_no", nativeQuery = true)
    public List<Object[]> viewCountDetails(@Param("year") String year);

    @Query(value = "select\n"
            + "MONTH(k.introduce_date) as month,\n"
            + " d.name ,\n"
            + " t.target,\n"
            + " COUNT(k.index_no) as qty\n"
            + "from\n"
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
            //        + "and \n"
            //        + " k.review_status='MANAGER_VIEW'\n"
            + "and\n"
            + " YEAR(k.introduce_date) = YEAR(t.target_year) "
            + "and\n"
            + "YEAR(k.introduce_date)=:year \n"
            + "group by \n"
            + " d.index_no,MONTH(k.introduce_date)", nativeQuery = true)
    public List<Object[]> monthWiseDetailByYear(@Param("year") String year);

    @Query(value = "select\n"
            + " k.introduce_date,\n"
            + " d.name as department,\n"
            + " e.name as employee,\n"
            + " e.epf_no,\n"
            + " SUM(k.manager_cost)+\n"
            + " SUM(k.manager_utilization)+\n"
            + " SUM(k.manager_creativity)+\n"
            + " SUM(k.manager_safety)+\n"
            + " SUM(k.manager_quality) as manager_score,\n"
            + " SUM(k.committee_cost)+\n"
            + " SUM(k.committee_utilization)+\n"
            + " SUM(k.committee_creativity)+\n"
            + " SUM(k.committee_safety)+\n"
            + " SUM(k.committee_quality) as committee_score ,\n"
            + " SUM(k.manager_cost)+\n"
            + " SUM(k.manager_utilization)+\n"
            + " SUM(k.manager_creativity)+\n"
            + " SUM(k.manager_safety)+\n"
            + " SUM(k.manager_quality) +\n"
            + " SUM(k.committee_cost)+\n"
            + " SUM(k.committee_utilization)+\n"
            + " SUM(k.committee_creativity)+\n"
            + " SUM(k.committee_safety)+\n"
            + " SUM(k.committee_quality) as total\n"
            + "from\n"
            + " kaizen k ,\n"
            + " employee e,\n"
            + " department d\n"
            + "where  \n"
            + " e.index_no=k.employee \n"
            + "and \n"
            + " e.department=d.index_no \n"
            + " and \n"
            + " k.committee_complete='COMMITTEE_COMPLETE'\n"
            + "and\n"
            + " YEAR(k.introduce_date)=:year \n"
            + " and\n"
            + " MONTH(k.introduce_date)=:month \n"
            + "group by \n"
            + "e.index_no\n"
            + "order by total desc LIMIT 5", nativeQuery = true)
    public List<Object[]> topKaizen(@Param("year") String year, @Param("month") String month);

    @Query(value = "select\n"
            + "k.introduce_date,\n"
            + " d.name as department,\n"
            + " e.name as employee,\n"
            + " e.epf_no ,\n"
            + " COUNT(k.index_no) as qty\n"
            + "from\n"
            + " kaizen k ,\n"
            + " employee e,\n"
            + " department d\n"
            + "where  \n"
            + " e.index_no=k.employee \n"
            + "and \n"
            + " e.department=d.index_no \n"
            + "and \n"
            + " k.employee_complete='EMPLOYEE_COMPLETE'\n"
            + "and\n"
            + "YEAR(k.introduce_date)=:year \n"
            + "and\n"
            + "MONTH(k.introduce_date)=:month \n"
            + "group by \n"
            + " e.index_no,MONTH(k.introduce_date)\n"
            + " order by qty desc limit 10", nativeQuery = true)
    public List<Object[]> top10Kaizen(@Param("year") String year, @Param("month") String month);
}
