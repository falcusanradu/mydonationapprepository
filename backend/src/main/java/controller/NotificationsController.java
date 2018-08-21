package controller;

import entity.Notification;
import manager.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notification")
public class NotificationsController {

    @Autowired
    private Manager manager;

    @RequestMapping(value = "/notifications", method = RequestMethod.GET)
    public Iterable<Notification> getAllNotifications() {
        return this.manager.findAllNotifications();
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void register(@RequestBody Notification notification) {
        this.manager.saveNotification(notification);

    }


}
