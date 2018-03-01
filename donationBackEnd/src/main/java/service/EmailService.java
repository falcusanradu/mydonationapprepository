package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;


import java.security.Security;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final String SMTP_HOST_NAME = "smtp.gmail.com";
    private static final String SMTP_PORT = "465";
    private static final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
    private static String emailMsgTxt = "";
    private static String emailSubjectTxt = "";
    private static String emailFromAddress = "licenta.donation@gmail.com";
    private static String[] sendTo = {};

    private static EmailService emailService = new EmailService();


    public void sendMail(List<String> sendMailTo, String emailFromAddress, String textMessage, String subject) throws Exception {

        EmailService.sendTo = this.convertListIntoArray(sendMailTo);
        EmailService.emailFromAddress = emailFromAddress;
        EmailService.emailMsgTxt = textMessage;
        EmailService.emailSubjectTxt = subject;

        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());

            emailService.sendSSLMessage(sendTo, emailSubjectTxt,
                    emailMsgTxt, emailFromAddress);
            System.out.println("Sucessfully Sent mail to All Users");
    }

    private void sendSSLMessage(String recipients[], String subject,
                                String message, String from) throws MessagingException {
        boolean debug = true;

        Properties props = new Properties();
        props.put("mail.smtp.host", SMTP_HOST_NAME);

        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.smtp.port", SMTP_PORT);
        props.put("mail.smtp.socketFactory.port", SMTP_PORT);
        props.put("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.put("mail.smtp.socketFactory.fallback", "false");
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {

                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("licenta.donation@gmail.com", "licenta.donation1");
                    }
                });

        session.setDebug(debug);

        Message msg = new MimeMessage(session);
        InternetAddress addressFrom = new InternetAddress(from);
        msg.setFrom(addressFrom);

        InternetAddress[] addressTo = new InternetAddress[recipients.length];
        for (int i = 0; i < recipients.length; i++) {
            addressTo[i] = new InternetAddress(recipients[i]);
        }
        msg.setRecipients(Message.RecipientType.TO, addressTo);

        // Setting the Subject and Content Type
        msg.setSubject(subject);
        msg.setContent(message, "text/plain");
            Transport.send(msg);

    }

    private String[] convertListIntoArray(List<String> list) {
        String[] array = new String[list.size()];
        return list.toArray(array);
    }
}