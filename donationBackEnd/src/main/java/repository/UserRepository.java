package repository;

import entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends CrudRepository<UserEntity, Integer> {

    @Query(value = "SELECT * FROM user_table u WHERE u.username= :username", nativeQuery = true)
    UserEntity findByUsername(@Param("username") String username);
}


