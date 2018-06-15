package service;

import entity.User;
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


    public User getUserByUsernameAndPassword(User user) {
        return this.userRepository.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
    }

    public User getUserByUsername(User user) {
        return this.userRepository.findByUsername(user.getUsername());
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(String username, String password, String email) {

        User userEntity = new User();
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

    public boolean changePassword(User user) {
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            this.userRepository.updateUserPasswordByUsername(user.getUsername(), user.getPassword());
            return true;
        }
        return false;
    }
}
