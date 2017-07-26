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

    @Query(value = "SELECT\n"
            + " target.target_year,\n"
            + " department.name,\n"
            + " target.target, SUM(kaizen.review_status='MANAGER_VIEW' || kaizen.appreciation='appreciation') AS qty,\n"
            + " company.name as company\n"
            + "FROM \n"
            + " target\n"
            + "LEFT JOIN department ON target.department = department.index_no\n"
            + "LEFT JOIN employee ON department.index_no= employee.department\n"
            + "LEFT JOIN kaizen ON kaizen.employee = employee.index_no\n"
            + "LEFT JOIN company ON company.index_no = department.company\n"
            + "WHERE YEAR(target.target_year)=:year and company.index_no=:company\n"
            + "GROUP BY department.index_no", nativeQuery = true)
    public List<Object[]> AllSummary(@Param("year") String year, @Param("company") String company);

    @Query(value = "select \n"
            + "	target.target as target,\n"
            + "	dep.name as department_name,\n"
            + "	(select count(kaizen.index_no) from kaizen \n"
            + "	left JOIN employee on employee.index_no=kaizen.employee \n"
            + "	left JOIN department on department.index_no=employee.department\n"
            + "	where month(kaizen.introduce_date)=:month and year(kaizen.introduce_date)=:year and kaizen.company=:company \n"
            + "	and department.index_no = dep.index_no) as kaizan_count,\n"
            + "	(select count(kaizen.index_no) from kaizen \n"
            + "	left JOIN employee on employee.index_no=kaizen.employee \n"
            + "	left JOIN department on department.index_no=employee.department\n"
            + "	where month(kaizen.introduce_date)=:month and year(kaizen.introduce_date)=:year and kaizen.company=:company \n"
            + "	and department.index_no = dep.index_no and kaizen.manager_complete='MANAGER_COMPLETE') as eveluveted,\n"
            + "	company.name as company\n"
            + "from\n"
            + "	target ,department dep,company\n"
            + "	where\n"
            + "	 dep.index_no=target.department and\n"
            + "	 company.index_no = dep.company and\n"
            + " year(target.target_year)=:year and target.company=:company", nativeQuery = true)
    public List<Object[]> viewCountDetails(@Param("year") String year, @Param("month") String month,@Param("company") String company);

    @Query(value = "SELECT MONTH(kaizen.introduce_date) AS MONTH,\n"
            + " department.name,\n"
            + "target.target, \n"
            + "SUM(kaizen.review_status='MANAGER_VIEW' || kaizen.appreciation='appreciation') AS qty, YEAR(target.target_year) AS targetyear,\n"
            + "company.index_no as company\n"
            + "FROM\n"
            + " target\n"
            + "LEFT JOIN department ON target.department = department.index_no\n"
            + "LEFT JOIN employee ON department.index_no= employee.department\n"
            + "LEFT JOIN kaizen ON kaizen.employee = employee.index_no\n"
            + "LEFT JOIN company ON company.index_no = department.company\n"
            + "WHERE YEAR(target.target_year)=:year AND \n"
            + "YEAR(kaizen.introduce_date) = YEAR(target.target_year) OR \n"
            + "ISNULL(YEAR(kaizen.introduce_date))\n"
            + "GROUP BY department.index_no, MONTH(kaizen.introduce_date)\n"
            + "HAVING targetyear=:year", nativeQuery = true)
    public List<Object[]> monthWiseDetailByYear(@Param("year") String year);

    @Query(value = "SELECT\n"
            + " k.introduce_date,\n"
            + " d.name AS department,\n"
            + " e.name AS employee,\n"
            + " e.epf_no, SUM(k.manager_cost)+ SUM(k.manager_utilization)+ SUM(k.manager_creativity)+ SUM(k.manager_safety)+ SUM(k.manager_quality) AS manager_score, SUM(k.committee_cost)+ SUM(k.committee_utilization)+ SUM(k.committee_creativity)+ SUM(k.committee_safety)+ SUM(k.committee_quality) AS committee_score, SUM(k.manager_cost)+ SUM(k.manager_utilization)+ SUM(k.manager_creativity)+ SUM(k.manager_safety)+ SUM(k.manager_quality) + SUM(k.committee_cost)+ SUM(k.committee_utilization)+ SUM(k.committee_creativity)+ SUM(k.committee_safety)+ SUM(k.committee_quality) AS total,\n"
            + "c.name\n"
            + "FROM\n"
            + " kaizen k,\n"
            + " employee e,\n"
            + " department d,\n"
            + " company c\n"
            + "WHERE \n"
            + " e.index_no=k.employee AND \n"
            + " e.department=d.index_no AND \n"
            + " c.index_no=d.company AND\n"
            + " k.committee_complete='COMMITTEE_COMPLETE' AND \n"
            + " c.index_no=:company AND\n"
            + " YEAR(k.introduce_date)=:year AND MONTH(k.introduce_date)=:month\n"
            + "GROUP BY \n"
            + " e.index_no\n"
            + "ORDER BY total DESC\n"
            + "LIMIT 5", nativeQuery = true)
    public List<Object[]> topKaizen(@Param("year") String year, @Param("month") String month, @Param("company") String company);

    @Query(value = "SELECT\n"
            + " k.introduce_date,\n"
            + " d.name AS department,\n"
            + " e.name AS employee,\n"
            + " e.epf_no, COUNT(k.index_no) AS qty,\n"
            + " c.name\n"
            + "FROM\n"
            + " kaizen k,\n"
            + " employee e,\n"
            + " department d,\n"
            + " company c\n"
            + "WHERE \n"
            + " e.index_no=k.employee AND \n"
            + " e.department=d.index_no AND\n"
            + " c.index_no=d.company AND\n"
            + " k.employee_complete='EMPLOYEE_COMPLETE' AND c.index_no=:company AND YEAR(k.introduce_date)=:year AND MONTH(k.introduce_date)=:month\n"
            + "GROUP BY\n"
            + " e.index_no, MONTH(k.introduce_date)\n"
            + "ORDER BY qty DESC\n"
            + "LIMIT 10", nativeQuery = true)
    public List<Object[]> top10Kaizen(@Param("year") String year, @Param("month") String month, @Param("company") String company);

    @Query(value = "SELECT\n"
            + " k.introduce_date,\n"
            + " e.name AS employee,\n"
            + " d.name AS department,\n"
            + " e.epf_no,\n"
            + " k.actual_cost,\n"
            + " c.name\n"
            + "FROM\n"
            + " kaizen k,\n"
            + " employee e,\n"
            + " department d,\n"
            + " company c\n"
            + "WHERE \n"
            + " e.index_no=k.employee AND \n"
            + " e.department=d.index_no AND \n"
            + " c.index_no=d.company AND \n"
            + " c.index_no=:company AND\n"
            + " YEAR(k.introduce_date)=:year AND MONTH(k.introduce_date)=:month AND (k.review_status='MANAGER_VIEW' OR k.appreciation='appreciation') AND k.actual_cost IS NOT NULL\n"
            + "GROUP BY k.index_no", nativeQuery = true)
    public List<Object[]> costSaving(@Param("year") String year, @Param("month") String month, @Param("company") String company);
}
