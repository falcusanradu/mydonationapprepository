package repository;

import entity.Product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface ProductRepository extends CrudRepository<Product, Integer> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "INSERT INTO product_table (description,image) VALUES (:description, :image)", nativeQuery = true)
    void insertProductWithGivenDescriptionAndImage(@Param("description") String description, @Param("image") String image);
}
