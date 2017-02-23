/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.document;

import com.mac.app.document.model.Document;
import com.mac.app.kaizen.model.TKaizen;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<Document> allDocument() {
        return documentRepository.findAll();
    }

    public void saveImage(Document document) {
        documentRepository.save(document);
    }

}
