package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.EmailService;

import java.util.ArrayList;
import java.util.List;

@RestController
// TODO delete this==== only for test__________________________
public class EmailController {

    @Autowired
    EmailService emailService;

    @RequestMapping("/signup")
    public String signUp() {
        return "Please sign up for our service.";
    }
// TODO delet class --- is for test
    @RequestMapping("/signup-success")
    public String signUpSuccess() {

        try {
//            this.emailService.sendNotification();
            List<String> sendTo = new ArrayList<>();
//            sendTo.add("sads");
            sendTo.add("saddsadsadasdasdasdsa@yahoo.com");
            sendTo.add("licenta.donation@gmail.com");
//            emailService.sendMail(sendTo);
        } catch (MailException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "if it's not working check that your antivirus is stopped.";
    }

}
