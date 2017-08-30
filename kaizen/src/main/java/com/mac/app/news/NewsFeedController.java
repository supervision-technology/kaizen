/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.news;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mac.app.news.model.News;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author my
 */
@RestController
@RequestMapping(path = "/api/news")
public class NewsFeedController {

    @Autowired
    private NewsFeedService newsFeedService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<News> allNewsFeed(){
        return newsFeedService.allNewsFeed();
    }

    @RequestMapping(value = "/save-newsfeed", method = RequestMethod.POST)
    public @ResponseBody
    News saveNewsFeed(@RequestPart("ad") String adString, @RequestPart("file") MultipartFile file) {

        News newsfeed = new News();

        try {
            News jsonAd = new ObjectMapper().readValue(adString, News.class);

            String fileName = file.getOriginalFilename();

            File uploadFile = new File("./src/site/images", fileName);
            if (!uploadFile.getParentFile().exists()) {
                uploadFile.getParentFile().mkdirs();
            }

            uploadFile.createNewFile();

            FileOutputStream fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(file.getBytes());

            jsonAd.setFile(fileName);
            newsfeed = newsFeedService.saveNewsFeed(jsonAd);

        } catch (Exception a) {
            a.printStackTrace();
        }

        return newsfeed;
    }
}
