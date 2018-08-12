package repository;

import entity.Company;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface CompanyRepository extends CrudRepository<Company, Integer> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "INSERT INTO product_table (description,image) VALUES (:description, :image)", nativeQuery = true)
    void insertProductWithGivenDescriptionAndImage(@Param("description") String description, @Param("image") String image);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete from Company c where c.idCompany= ?1")
    void deleteCompaniesById(@Param("id") Integer id);



}
