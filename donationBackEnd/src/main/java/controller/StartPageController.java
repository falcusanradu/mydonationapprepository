package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class StartPageController {

    @RequestMapping("/")
    public String index(String s) {
        s = "Greetings";
        return s;
    }

}
