package controller;

import entity.User;
import entity.UserTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Integer id) {
        this.manager.deleteUserById(id);
        return new ResponseEntity<User>(HttpStatus.OK);
    }

    @RequestMapping(value = "/update/{newUserType}", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable("newUserType") UserTypeEnum newUserType) {
        boolean deleteCompany = this.manager.findUserById(user).getCompany() != null;
        Integer companyId = null;
        if (deleteCompany) {
            companyId = this.manager.findUserById(user).getCompany().getIdCompany();
        }
        user.setCompany(null);
        user.setType(newUserType);
        this.manager.saveOrUpdateUser(user);
        if (deleteCompany) {
            this.manager.deleteCompanyById(companyId);
        }
        return new ResponseEntity<User>(HttpStatus.OK);
    }


    @RequestMapping(value = "/getUser/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findUserById(@PathVariable("id") Integer id) {
        User user = this.manager.findUserById(id);
        if (user == null)
            return new ResponseEntity<>("404", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @RequestMapping(value = "/findByUsername/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public User findUserByUsername(@PathVariable("username") String username) {
        return this.manager.findUserByUsername(username);
    }


    @RequestMapping(value = "/deleteByUser/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCompanyUserByUser(@PathVariable("id") Integer id) {
        final User user = this.manager.findUserById(id);
        this.manager.deleteCompanyByUser(user);
        return new ResponseEntity<User>(HttpStatus.OK);
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User updateUser(@RequestBody User user) {
        return this.manager.updateUser(user);
    }

}
