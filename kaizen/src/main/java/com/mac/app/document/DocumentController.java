/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.document;

import com.mac.app.document.model.Document;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Document> allDocument() {
        return documentService.allDocument();
    }
}
