package controller;

import entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import service.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

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

        if (userService.getUserByUsername(user.getUsername()) == null) {
            return userService.save(user.getUsername(), user.getPassword());
        }
        return null;
    }

}
