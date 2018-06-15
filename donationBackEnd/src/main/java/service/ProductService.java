package service;


import entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.ProductRepository;

import java.util.Base64;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Company> getAllProducts() {
        return productRepository.findAll();
    }


    public void uploadFile(byte[] file, String fileName) {
        String encodedImage = Base64.getEncoder().encodeToString(file);
        this.productRepository.insertProductWithGivenDescriptionAndImage(fileName, encodedImage);
    }
}
