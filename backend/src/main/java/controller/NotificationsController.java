package controller;

import entity.Notification;
import entity.User;
import manager.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notification")
public class NotificationsController {

    @Autowired
    private Manager manager;

    @RequestMapping(value = "/notifications", method = RequestMethod.GET)
    public List<Notification> getAllNotifications() {
        return this.manager.getAllNotificationsSortedByDate();
    }




    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void persistNotification(@RequestBody final Notification notification) {
        this.manager.saveNotification(notification);

    }


    @RequestMapping(value = "/saveCheck", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void persistCheckedNotification(@RequestBody final Notification notification) {
        this.manager.saveCheckedNotification(notification);

    }


}
