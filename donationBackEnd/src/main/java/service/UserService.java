package service;

import entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserEntity save(String username, String password) {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(password);
        return userRepository.save(userEntity);
    }
}
