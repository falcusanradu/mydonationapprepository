package controller;

import entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import manager.Manager;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {

    @Autowired
    private Manager manager;

    @RequestMapping(value = "/getAllProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Iterable<Company> getAllProducts() {
//        List<byte[]> images = new ArrayList<>();
//        List<String> imagesText = new ArrayList<>();
//        manager.getAllProducts().forEach(p -> {
//            imagesText.add(p.getImage());
//        });
//
//        return imagesText.get(0);
        return this.manager.getAllProducts();
    }

    @RequestMapping(value = "/getAllProducts2", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String getAllProducts2() {
        List<byte[]> images = new ArrayList<>();
        List<String> imagesText = new ArrayList<>();
        manager.getAllProducts().forEach(p -> {
            imagesText.add(p.getImage());
        });

        return imagesText.get(0);
    }

    @RequestMapping(value = "/uploadFile/{fileName}", method = RequestMethod.POST, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public void uploadFile(@RequestBody byte[] file, @PathVariable String fileName) {
        this.manager.uploadFile(file, fileName);
    }

}
