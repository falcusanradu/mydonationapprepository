package entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table(name = "notification_table")
@Entity
public class Notification implements Serializable {

    @Id
    @Column(name = "idNotification")
    private Integer idNotification;

    @Column(name = "message")
    private Integer idUser;

    @Column(name = "message_read")
    private Boolean read;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REMOVE
    })
    @JoinTable(name = "user_notification",
            joinColumns = @JoinColumn(name = "idNotification"),
            inverseJoinColumns = @JoinColumn(name = "idUser")
    )
    @JsonIgnore
    private List<User> usersNotification = new ArrayList<>();

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public Integer getIdNotification() {
        return idNotification;
    }

    public void setIdNotification(Integer idNotification) {
        this.idNotification = idNotification;
    }

    public List<User> getUsersNotification() {
        return usersNotification;
    }

    public void setUsersNotification(List<User> usersNotification) {
        this.usersNotification = usersNotification;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }
}
