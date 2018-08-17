package controller;

import entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import manager.Manager;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private Manager manager;

    @RequestMapping(value = "/companies", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Iterable<Company> getAllCompanies() {
        return this.manager.getAllCompanies();
    }

    @RequestMapping(value = "/getAllProducts2", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String getAllProducts2() {
        List<byte[]> images = new ArrayList<>();
        List<String> imagesText = new ArrayList<>();
        manager.getAllCompanies().forEach(p -> {
            imagesText.add(p.getImage());
        });

        return imagesText.get(0);
    }

    @RequestMapping(value = "/uploadFile/{fileName}/{companyId}", method = RequestMethod.POST, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public void uploadFile(@RequestBody byte[] file, @PathVariable String fileName, @PathVariable Integer companyId) {
        this.manager.uploadFile(file, fileName, companyId);
    }


    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Integer id) {
        this.manager.deleteCompanyById(id);
        return new ResponseEntity<Company>(HttpStatus.OK);
    }


    @RequestMapping(value = "/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateCompany(@RequestBody Company company) throws Exception {
        this.manager.saveOrUpdateCompany(company);
    }

    @RequestMapping(value = "/createCompany/{userId}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createCompanyForUser(@PathVariable("userId") Integer userId) {
        this.manager.createCompanyForSpecificUser(userId);
    }

}
