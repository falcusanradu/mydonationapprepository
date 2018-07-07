package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import manager.EmailService;
import manager.Manager;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    private static String NEW_REGISTRATION_EMAIL = "thank you for registration";

    @Autowired
    private Manager manager;
    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/login/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User login(@RequestBody User user) {
        return manager.getUserByUsernameAndPassword(user);
    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User register(@RequestBody User user) {

        if (this.manager.getUserByUsername(user) == null && this.manager.getUserByEmail(user.getEmail()) == null) {
            List<String> sendTo = new ArrayList<>();
            sendTo.add(user.getEmail());
            try {
                this.emailService.sendMail(sendTo, "licenta.donation@gmail.com", NEW_REGISTRATION_EMAIL, "myDoantionSubject");
            } catch (Exception e) {
//                e.printStackTrace();
            }
            return manager.save(user.getUsername(), user.getPassword(), user.getEmail());
        } else if (this.manager.getUserByEmail(user.getEmail()) != null) {
            return new User();
        }
        return null;
    }

    @RequestMapping(value = "/resetPassword/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean resetPassword(@RequestBody User user) throws Exception {
        return manager.resetPassword(user.getEmail());
    }

    @RequestMapping(value = "/changePassword/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean changePassword(@RequestBody User user) throws Exception {
        return manager.changePassword(user);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public Iterable<User> getAllUsers() {
        return this.manager.getAllUsers();
    }


}
