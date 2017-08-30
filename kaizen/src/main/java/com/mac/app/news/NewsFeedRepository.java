/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.news;

import com.mac.app.news.model.News;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface NewsFeedRepository extends JpaRepository<News, Integer>{
    
}
