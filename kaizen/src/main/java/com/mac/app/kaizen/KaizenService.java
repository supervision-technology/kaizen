/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.app.kaizen;

import com.mac.app.document.DocumentRepository;
import com.mac.app.document.model.Document;
import com.mac.app.employee.EmployeeRepository;
import com.mac.app.employee.model.Employee;
import com.mac.app.kaizen.model.Mail;
import com.mac.app.kaizen.model.TKaizen;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class KaizenService {

    @Autowired
    private KaizenRepository kaizenRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final String KAIZEN_PENDING = "PENDING";
    private static final String MANAGER_VIEW = "MANAGER_VIEW";
    private static final String COMMITTEE_COMPLETE = "COMMITTEE_COMPLETE";
    private static final String EMPLOYEE_COMPLETE = "EMPLOYEE_COMPLETE";
    private static final String MANAGER_COMPLETE = "MANAGER_COMPLETE";

    public List<TKaizen> findByCompany(int company) {
        return kaizenRepository.findByCompany(company);
    }

    public List<TKaizen> getKaizenByDepartment(Integer index) {
        List<TKaizen> kaizen = new ArrayList<>();

        List<Employee> empList = employeeRepository.findByDepartmentIndexNo(index);

        for (Employee employee : empList) {
            for (TKaizen tkaizen : kaizenRepository.findByEmployee(employee.getIndexNo())) {
                if (tkaizen != null) {
                    kaizen.add(tkaizen);
                }
            }
        }
        return kaizen;
    }

    public List<TKaizen> getKaizenByEmployee(String epfNo) {
        Employee employee = employeeRepository.findByEpfNo(epfNo);
        if (employee != null) {
            return kaizenRepository.findByEmployee(employee.getIndexNo());
        }
        return null;
    }

    @Transactional
    public TKaizen saveKazen(TKaizen kaizen) {
//        System.out.println(kaizen.toString());
        int avg = (30 / 5 * Integer.parseInt(kaizen.getEmployeeCost())) + (20 / 5 * Integer.parseInt(kaizen.getEmployeeCreativity()))
                + (15 / 5 * Integer.parseInt(kaizen.getEmployeeQuality())) + (20 / 5 * Integer.parseInt(kaizen.getEmployeeSafety()))
                + (15 / 5 * Integer.parseInt(kaizen.getEmployeeUtilization()));

        kaizen.setIntroduceDate(new Date());

//        //if manager kaizen then automatically manager approve
        Employee employee = employeeRepository.findOne(kaizen.getEmployee());
        if (employee.getType().equalsIgnoreCase("Manager") && avg >= 70) {
            kaizen.setEmployeeComplete(EMPLOYEE_COMPLETE);
            kaizen.setReviewStatus(MANAGER_VIEW);
            kaizen.setManagerComplete(MANAGER_COMPLETE);
            kaizen.setManagerCost(kaizen.getEmployeeCost());
            kaizen.setManagerCreativity(kaizen.getEmployeeCreativity());
            kaizen.setManagerQuality(kaizen.getEmployeeQuality());
            kaizen.setManagerSafety(kaizen.getEmployeeSafety());
            kaizen.setManagerUtilization(kaizen.getEmployeeUtilization());
        } else if (employee.getType().equalsIgnoreCase("Manager") && avg < 70) {
            kaizen.setAppreciation("appreciation");
//            kaizen.setReviewStatus(MANAGER_VIEW);
            kaizen.setEmployeeComplete(EMPLOYEE_COMPLETE);
            kaizen.setManagerComplete(MANAGER_COMPLETE);

            if (employee.getEmail() != null || employee.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(employee.getEmail());
//                        messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject("Kaizen Appreciation");
                        messageHelper.setText("Hi (" + employee.getName() + "),\n\nTHANK YOU !!! for your effort towards improving the continues improvement culture in Linea Aqua.\n\nWe have considered your Kaizen in the " + new Date() + " kaizen forum and found it as a valuable idea for Linea Aqua.\n\nWe hope you will keep doing Kaizens to bring Linea Aqua to the next level.\n\nThanks & Regards,\nKaizen Committee");
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
        } else {
            kaizen.setReviewStatus(KAIZEN_PENDING);
            kaizen.setEmployeeComplete(EMPLOYEE_COMPLETE);
        }

        List<TKaizen> list = kaizenRepository.findByEmployeeAndCompanyAndDescription(kaizen.getEmployee(), kaizen.getCompany(), kaizen.getDescription());
        if (list.size() == 0) {
            return kaizenRepository.save(kaizen);
        }
        return null;
    }

    @Transactional
    public TKaizen kaizenUpdateByManager(Mail mail) {
        TKaizen kaizen1 = kaizenRepository.findOne(mail.getIndexNo());

        kaizen1.setManagerCost(mail.getManagerCost());
        kaizen1.setManagerCreativity(mail.getManagerCreativity());
        kaizen1.setManagerQuality(mail.getManagerQuality());
        kaizen1.setManagerSafety(mail.getManagerSafety());
        kaizen1.setManagerUtilization(mail.getManagerUtilization());
        kaizen1.setReviewStatus(MANAGER_VIEW);
        kaizen1.setManagerComplete(MANAGER_COMPLETE);
        kaizen1.setManagerActualCost(mail.getManagerActualCost());
        TKaizen save = kaizenRepository.save(kaizen1);
        if (save != null) {
            if (mail.getEmail() != null || mail.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(mail.getEmail());
//                messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject(mail.getSubject());
                        messageHelper.setText(mail.getMessage());
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
            return save;
        }
        return null;
    }

    @Transactional
    public TKaizen kaizenUpdateByCommittee(TKaizen kaizen) {
        TKaizen kaizen1 = kaizenRepository.findOne(kaizen.getIndexNo());

        kaizen1.setCommitteeCost(kaizen.getCommitteeCost());
        kaizen1.setCommitteeCreativity(kaizen.getCommitteeCreativity());
        kaizen1.setCommitteeQuality(kaizen.getCommitteeQuality());
        kaizen1.setCommitteeSafety(kaizen.getCommitteeSafety());
        kaizen1.setCommitteeUtilization(kaizen.getCommitteeUtilization());
        kaizen1.setCommitteeComplete(COMMITTEE_COMPLETE);
        kaizen1.setCommitteeActualCost(kaizen.getCommitteeActualCost());
        return kaizenRepository.save(kaizen1);
    }

    @Transactional
    public TKaizen updateKaizenByIndex(Mail mail, Integer indexNo) {
        TKaizen kaizen = kaizenRepository.findOne(indexNo);
        kaizen.setManagerCost(mail.getManagerCost());
        kaizen.setManagerCreativity(mail.getManagerCreativity());
        kaizen.setManagerQuality(mail.getManagerQuality());
        kaizen.setManagerSafety(mail.getManagerSafety());
        kaizen.setManagerUtilization(mail.getManagerUtilization());
        kaizen.setReviewStatus(null);
        kaizen.setSuggestion("suggestion");
        kaizen.setManagerComplete(MANAGER_COMPLETE);
        TKaizen save = kaizenRepository.save(kaizen);
        if (save != null) {
            if (mail.getEmail() != null || mail.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(mail.getEmail());
//                    messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject(mail.getSubject());
                        messageHelper.setText(mail.getMessage());
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
            return save;
        }
        return null;
    }

    @Transactional
    public TKaizen Appreciation(Mail mail, Integer indexNo) {
        TKaizen kaizen = kaizenRepository.findOne(indexNo);
        kaizen.setManagerCost(mail.getManagerCost());
        kaizen.setManagerCreativity(mail.getManagerCreativity());
        kaizen.setManagerQuality(mail.getManagerQuality());
        kaizen.setManagerSafety(mail.getManagerSafety());
        kaizen.setManagerUtilization(mail.getManagerUtilization());
        kaizen.setReviewStatus(null);
        kaizen.setAppreciation("appreciation");
        kaizen.setManagerComplete(MANAGER_COMPLETE);
        kaizen.setManagerActualCost(mail.getManagerActualCost());
        TKaizen save = kaizenRepository.save(kaizen);
        if (save != null) {
            if (mail.getEmail() != null || mail.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(mail.getEmail());
//                    messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject(mail.getSubject());
                        messageHelper.setText(mail.getMessage());
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
            return save;
        }
        return null;
    }

    @Transactional
    public void deleteKaizen(Integer IndexNo, Mail mail) {
        List<Document> document = documentRepository.findByKaizen(IndexNo);

        if (document != null) {
            if (mail.getEmail() != null || mail.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(mail.getEmail());
//                    messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject("Kaizen Deleted..");
                        messageHelper.setText("Your kaizen deleted by admin");
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
            documentRepository.delete(document);
            kaizenRepository.delete(IndexNo);

        } else {
            if (mail.getEmail() != null || mail.getEmail() != "") {
                try {
                    MimeMessagePreparator messagePreparator = mimeMessage -> {
                        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                        messageHelper.setFrom("kaizencommittee1@gmail.com");
                        messageHelper.setTo(mail.getEmail());
//                    messageHelper.setTo("niduraprageeth@gmail.com");
                        messageHelper.setSubject("Kaizen Deleted..");
                        messageHelper.setText("Your kaizen deleted by admin");
                    };
                    mailSender.send(messagePreparator);
                } catch (MailException e) {
                    System.out.println(e);
                }
            }
            kaizenRepository.delete(IndexNo);
        }
    }

}
