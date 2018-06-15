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
    @Column(name = "id_notification")
    private Integer id_notification;

    @Column(name = "message")
    private Integer id_user;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REMOVE
    })
    @JoinTable(name = "user_notification",
            joinColumns = @JoinColumn(name = "id_notification"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }

    public Integer getId_notification() {
        return id_notification;
    }

    public void setId_notification(Integer id_notification) {
        this.id_notification = id_notification;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

}
