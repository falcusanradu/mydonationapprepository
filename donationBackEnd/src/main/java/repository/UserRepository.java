package repository;

import entity.UserEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;


public interface UserRepository extends CrudRepository<UserEntity, Integer> {

    @Transactional
    @Query(value = "SELECT * FROM user_table u WHERE u.username= :username", nativeQuery = true)
    UserEntity findByUsername(@Param("username") String username);

    @Transactional
    @Query(value = "SELECT * FROM user_table u WHERE u.email= :email", nativeQuery = true)
    UserEntity findByEmail(@Param("email") String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE user_table SET password= :password WHERE email= :email", nativeQuery = true)
    void updateUserPasswordByEmail(@Param("email") String email, @Param("password") String password);
}


