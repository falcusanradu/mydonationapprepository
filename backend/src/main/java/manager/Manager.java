package manager;

import entity.Company;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CompanyRepository;
import repository.UserRepository;

import java.util.*;

@Service
public class Manager {

    // for random password generator
    public static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static final String LOWER = UPPER.toLowerCase(Locale.ROOT);

    public static final String DIGITS = "0123456789";

    public static final String ALPHANUM = UPPER + LOWER + DIGITS;


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private CompanyRepository companyRepository;


    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }


    public void uploadFile(byte[] file, String fileName) {
        String encodedImage = Base64.getEncoder().encodeToString(file);
        this.companyRepository.insertProductWithGivenDescriptionAndImage(fileName, encodedImage);
    }


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

    /**
     * It resets the password
     *
     * @param email
     * @return
     * @throws Exception
     */
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

    /**
     * It generates an alphanumeric random password.
     *
     * @return
     */
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

    /**
     * It changes the password.
     *
     * @param user
     * @return
     */
    public boolean changePassword(User user) {
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            this.userRepository.updateUserPasswordByUsername(user.getUsername(), user.getPassword());
            return true;
        }
        return false;
    }

    /**
     * Gets all users.
     *
     * @return
     */
    public Iterable<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    /**
     * Deletes a user.
     */
    public void deleteUserById(Integer id) {
        this.userRepository.delete(id);
    }


    /**
     * Updates or create a new user.
     *
     * @param user mandatory
     */
    public void saveOrUpdateUser(final User user) {
        this.userRepository.save(user);
    }



    /**
     * Deletes a user.
     */
    public void deleteCompanyById(Integer id) {
        this.companyRepository.delete(id);
    }


    public User findUserById(User user) {
        return this.userRepository.findById(user.getId());
    }


}
