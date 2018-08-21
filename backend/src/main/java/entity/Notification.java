package entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;

@Table(name = "notification_table")
@Entity
public class Notification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notification")
    private Integer idNotification;

    @Column(name = "message")
    private String message;

    @Column(name = "message_read")
    private Boolean read;


    @JoinColumn(name = "username_to")
//    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private String usernameTo;

    @Column(name = "username_from")
    private String usernameFrom;

    @Column(name = "notification_time")
    private Calendar notificationTime;


    public Notification() {
    }

    public Integer getIdNotification() {
        return idNotification;
    }

    public void setIdNotification(Integer idNotification) {
        this.idNotification = idNotification;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public String getUsernameTo() {
        return usernameTo;
    }

    public void setUsernameTo(String usernameTo) {
        this.usernameTo = usernameTo;
    }

    public String getUsernameFrom() {
        return usernameFrom;
    }

    public void setUsernameFrom(String usernameFrom) {
        this.usernameFrom = usernameFrom;
    }

    public Calendar getNotificationTime() {
        return notificationTime;
    }

    public void setNotificationTime(Calendar notificationTime) {
        this.notificationTime = notificationTime;
    }
}
