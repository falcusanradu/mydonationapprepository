package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.EmailService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @RequestMapping("/signup")
    public String signUp() {
        return "Please sign up for our service.";
    }

    @RequestMapping("/signup-success")
    public String signUpSuccess() {

        try {
//            this.emailService.sendNotification();
            List<String> sendTo = new ArrayList<>();
//            sendTo.add("sads");
            sendTo.add("saddsadsadasdasdasdsa@yahoo.com");
            sendTo.add("licenta.donation@gmail.com");
            emailService.sendMail(sendTo);
        } catch (MailException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Thanks for registration with us.";
    }

}
