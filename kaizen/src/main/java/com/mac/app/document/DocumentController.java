/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.document;

import com.mac.app.document.model.Document;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import static javassist.CtMethod.ConstParameter.string;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nidura Prageeth
 */
@RestController
@CrossOrigin
@RequestMapping("/api/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-S");

    @RequestMapping(method = RequestMethod.GET)
    public List<Document> allDocument() {
        return documentService.allDocument();
    }

    @RequestMapping(value = "/upload-image/{index}/{status}", method = RequestMethod.POST, consumes = "multipart/form-data")
    public void saveImage(@RequestParam("file") MultipartFile file, @PathVariable Integer index, @PathVariable String status) {
        try {
            String fileName = dateFormat.format(new Date());
            fileName = Base64.getEncoder().encodeToString(fileName.getBytes()) + file.getOriginalFilename();

            System.out.println(fileName);
            File uploadFile = new File("./files", fileName);
            if (!uploadFile.getParentFile().exists()) {
                uploadFile.getParentFile().mkdirs();
            }

            uploadFile.createNewFile();

            FileOutputStream fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(file.getBytes());

            Document doc = new Document();
            doc.setKaizen(index);
            doc.setPath(fileName);
            doc.setType(status);
            System.out.println(status);

            documentService.saveImage(doc);

        } catch (Exception a) {
            a.printStackTrace();
        }
    }

    @RequestMapping(value = "/download-image/{path}/", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
    public void loadEmployeeImage(@PathVariable String path, HttpServletResponse response) {
        File file = new File("./files/" + path + ".jpg");
//        File file = new File("./files/" + path);

        System.out.println(file.getAbsolutePath());
        try {
            OutputStream outputStream = response.getOutputStream();

            FileInputStream inputStream = new FileInputStream(file);
            byte[] read = new byte[8196];
            int c = 0;
            while ((c = inputStream.read(read, 0, read.length)) > 0) {
                outputStream.write(read, 0, c);
                outputStream.flush();
            }
            inputStream.close();
            outputStream.close();

        } catch (IOException ex) {
            Logger.getLogger(DocumentController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/kaizen-image/{path:.+}", method = RequestMethod.GET)
    public void loadImage(@PathVariable String path, HttpServletResponse response) {
        System.out.println(path);
        
        File file = new File("./files/" + path);

        System.out.println(file.getAbsolutePath());
        try {
//            response.setHeader("Content-Disposition:", "attachment; filename=\"my-file\"");
            OutputStream outputStream = response.getOutputStream();

            FileInputStream inputStream = new FileInputStream(file);
            byte[] read = new byte[8196];
            int c = 0;
            while ((c = inputStream.read(read, 0, read.length)) > 0) {
                outputStream.write(read, 0, c);
                outputStream.flush();
            }
            inputStream.close();
            outputStream.close();

        } catch (IOException ex) {
            Logger.getLogger(DocumentController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
