/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.news;

import com.mac.app.news.model.News;
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
public class NewsFeedService {

    @Autowired
    private NewsFeedRepository newsFeedRepository;

    public News saveNewsFeed(News news) {
        return newsFeedRepository.save(news);
    }
    
    public List<News> allNewsFeed(){
        return newsFeedRepository.findAll();
    }
}
