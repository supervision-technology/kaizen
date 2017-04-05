/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen.model;

import java.io.Serializable;

/**
 *
 * @author Nidura Prageeth
 */
public class Mail implements Serializable{
    
    private String email;
    private String message;
    private String subject;

    public Mail() {
    }

    public Mail(String email, String message, String subject) {
        this.email = email;
        this.message = message;
        this.subject = subject;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    
    
    
}
