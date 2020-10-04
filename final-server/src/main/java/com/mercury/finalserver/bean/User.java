package com.mercury.finalserver.bean;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "msi_user")
public class User implements UserDetails {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id; // primary key should be an object for JpaRepository

    @Column(unique = true, nullable = false)
    @NotNull
    @Size(min = 3, message = "username should be more than 3 character")
    private String username;

//    @JsonIgnore // cannot ignore, other wise will not parse data
    @Column
    @NotNull
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "MSI_USER_MSI_USER_PROFILE",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "user_profile_id", referencedColumnName = "id")}
    )
    private Set<UserProfile> profiles;

    @JsonIgnore
    @ManyToMany(mappedBy = "students",fetch = FetchType.EAGER)
    private Set<IndoorClass> classes;

    @JsonIgnore
    @OneToMany(mappedBy = "coach", cascade = CascadeType.ALL)
    private Set<Appointment> coachTrainings;

    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<Appointment> studentTrainings;

    // Foreign Key is not in this table
    // So when update userdetail, we only need to delete previouse one or update previouse one
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserDetail userDetail;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return profiles;
    }
    

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean equals(Object o) {
        if(o == this) return true;
        if(o instanceof User) {
            return ((User)o).id == this.id;
        }
        return false;
    }
    @Override
    public int hashCode() {
        return id.intValue();
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<UserProfile> getProfiles() {
        return profiles;
    }

    public void setProfiles(Set<UserProfile> profiles) {
        this.profiles = profiles;
    }

    public UserDetail getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetail userDetail) {
        this.userDetail = userDetail;
    }

    public Set<IndoorClass> getClasses() {
        return classes;
    }

    public void setClasses(Set<IndoorClass> classes) {
        this.classes = classes;
    }

    public Set<Appointment> getCoachTrainings() {
        return coachTrainings;
    }

    public void setCoachTrainings(Set<Appointment> coachTrainings) {
        this.coachTrainings = coachTrainings;
    }

    public Set<Appointment> getStudentTrainings() {
        return studentTrainings;
    }

    public void setStudentTrainings(Set<Appointment> studentTrainings) {
        this.studentTrainings = studentTrainings;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
