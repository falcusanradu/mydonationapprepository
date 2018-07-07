package repository;

import entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface UserRepository extends CrudRepository<User, Integer> {

    @Transactional
    User findUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @Transactional
    User findByEmail(@Param("email") String email);

    @Transactional
    User findByUsername(@Param("email") String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE user_table SET password= :password WHERE email= :email", nativeQuery = true)
    void updateUserPasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE user_table SET password= :password WHERE username= :username", nativeQuery = true)
    void updateUserPasswordByUsername(@Param("username") String username, @Param("password") String password);

}


