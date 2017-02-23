/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.document;

import com.mac.app.document.model.Document;
import java.awt.Image;
import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

//    @RequestMapping(value = "/save-image", method = RequestMethod.POST)
//    public void saveImage(@RequestBody Document document) {
//        documentService.saveImage(document);
//    }
    @RequestMapping(value = "/upload-image/{index}", method = RequestMethod.POST)
    public void saveImage(@RequestParam("file") MultipartFile file , @PathVariable Integer index) {
        try {
            byte[] bytes = file.getBytes();   
            
            Document doc = new Document();
            doc.setKaizen(index);
            doc.setPath(bytes);

            documentService.saveImage(doc);
        } catch (Exception a) {
            a.printStackTrace();
        }
    }

}
