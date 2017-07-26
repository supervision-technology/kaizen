/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.topKaizen;

import com.mac.app.topKaizen.model.TopKaizen;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Nidura Prageeth
 */
public interface TopKaizenRepository extends JpaRepository<TopKaizen, Integer> {

    @Query(value = "select * from topkaizen where YEAR(topkaizen.month)=:year and topkaizen.company=:company", nativeQuery = true)
    public List<TopKaizen> findByYear(@Param("year") String year,@Param("company") String company);

    public List<TopKaizen> findByCompany(int company);

    public TopKaizen findByCompanyAndDate(int company, Date date);

}
