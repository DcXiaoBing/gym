package com.mercury.finalserver.bean;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Table(name = "msi_user_profile")
public class UserProfile implements GrantedAuthority {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial")
    private Long id;
    
    @Column
    private String type;

    // MappedBy works!!!
    @JsonIgnore
    @ManyToMany(mappedBy = "profiles")
    private Set<User> users;

	@Override
    public String getAuthority() {
        return type; // type represents the authority type
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "UserProfile [id=" + id + ", type=" + type + "]";
    }
    
}
