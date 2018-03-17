package service;

import entity.UserEntity;
import org.hibernate.boot.spi.InFlightMetadataCollector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;


    // for random password generator
    public static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static final String LOWER = UPPER.toLowerCase(Locale.ROOT);

    public static final String DIGITS = "0123456789";

    public static final String ALPHANUM = UPPER + LOWER + DIGITS;


    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserEntity save(String username, String password, String email) {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(password);
        userEntity.setEmail(email);
        return userRepository.save(userEntity);
    }

    public boolean resetPassword(String email) throws Exception {
        if (this.getUserByEmail(email) != null) {
            String newPass = generateRandomPassword();
            userRepository.updateUserPasswordByEmail(email, newPass);
            List<String> sendTo = new ArrayList<>();

            sendTo.add(email);

            emailService.sendMail(sendTo, "licenta.donation@gmail.com", newPass, "your new password");
            return true;
        }
        return false;
    }

    private String generateRandomPassword() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            int randomIndex = 0 + (int) (Math.random() * (ALPHANUM.length() - 1));
            char c = ALPHANUM.charAt(randomIndex);
            sb.append(c);
        }
        return sb.toString();
    }

    public boolean changePassword(UserEntity user) {
        if (this.getUserByUsername(user.getUsername()) != null) {
            this.userRepository.updateUserPasswordByUsername(user.getUsername(), user.getPassword());
            return true;
        }
        return false;
    }
}
