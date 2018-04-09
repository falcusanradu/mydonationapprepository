package service;


import entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import repository.ProductRepository;

import java.util.Base64;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }


    public void uploadFile(byte[] file, String fileName) {
        String encodedImage = Base64.getEncoder().encodeToString(file);
        this.productRepository.insertProductWithGivenDescriptionAndImage(fileName, encodedImage);
    }
}
