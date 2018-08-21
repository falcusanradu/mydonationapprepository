package manager;

import entity.Company;
import entity.Notification;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CompanyRepository;
import repository.NotificationRepository;
import repository.UserRepository;

import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private NotificationRepository notificationRepository;


    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public void uploadFile(byte[] file, String fileName, Integer companyId) {
        String encodedImage = Base64.getEncoder().encodeToString(file);
        final Company company = this.companyRepository.findOne(companyId);
        company.setImage(encodedImage);
        this.companyRepository.save(company);
//        this.companyRepository.insertProductWithGivenDescriptionAndImage(fileName, encodedImage);
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
        this.companyRepository.deleteCompaniesById(id);
    }


    public User findUserById(User user) {
        return this.userRepository.findById(user.getId());
    }

    public User findUserById(Integer id) {
        return this.userRepository.findById(id);
    }

    public void saveOrUpdateCompany(Company company) {
        this.companyRepository.save(company);
    }

    public void createCompanyForSpecificUser(Integer userId) {
        final User user = this.userRepository.findById(userId);
        Company company = new Company();
        user.setCompany(company);
        this.userRepository.save(user);
    }

    public User findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }


    private List<Notification> sortByDate(final List<Notification> notifications) {
        final List<Notification> withNullValues = new ArrayList<>();
        final List<Notification> withoutNull = new ArrayList<>();
        for (Notification not : notifications) {
            if (not.getNotificationTime() != null) {
                withoutNull.add(not);
            } else {
                withNullValues.add(not);
            }
        }
        final List<Notification> sortedNottifications = withoutNull.stream().sorted((n1, n2) ->
                n2.getNotificationTime().compareTo(n1.getNotificationTime())).collect(Collectors.toList());
        withNullValues.forEach(n -> sortedNottifications.add(n));
        return sortedNottifications;

    }

    public List<Notification> getAllNotificationsSortedByDate() {
        return sortByDate(this.convertIterableToList(this.notificationRepository.findAll()));

    }

    public void saveNotification(final Notification notification) {
        notification.setNotificationTime(this.toCalendar(new Date()));
        this.notificationRepository.save(notification);
    }


    private <T> List<T> convertIterableToList(Iterable<T> source) {
        List<T> target = new ArrayList<>();
        source.forEach(target::add);
        return target;
    }


    private Calendar toCalendar(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal;
    }
}
