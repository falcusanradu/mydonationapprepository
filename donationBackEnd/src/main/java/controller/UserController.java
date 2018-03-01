package controller;

import entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import service.EmailService;
import service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    private static String NEW_REGISTRATION_EMAIL = "thank you for registration";

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/login/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity login(@RequestBody UserEntity user) {

        UserEntity dbUser = userService.getUserByUsername(user.getUsername());

        if (dbUser != null && dbUser.getPassword().equals(user.getPassword()))
            return dbUser;
        return null;
    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity register(@RequestBody UserEntity user) {

        if (this.userService.getUserByUsername(user.getUsername()) == null && this.userService.getUserByEmail(user.getEmail()) == null) {
            List<String> sendTo = new ArrayList<>();
            sendTo.add(user.getEmail());
            try {
                this.emailService.sendMail(sendTo, "licenta.donation@gmail.com", NEW_REGISTRATION_EMAIL, "myDoantionSubject");
            } catch (Exception e) {
//                e.printStackTrace();
            }
            return userService.save(user.getUsername(), user.getPassword(), user.getEmail());
        } else if (this.userService.getUserByEmail(user.getEmail()) != null) {
            return new UserEntity();
        }
        return null;
    }

}
