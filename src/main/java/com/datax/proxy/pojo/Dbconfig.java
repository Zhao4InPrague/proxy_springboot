package com.datax.proxy.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "dbconfig")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer" })
public class Dbconfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    private String name_;
    private String host;
    private String user;
    private String password_;
    private String database_;
    private String port;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public String getName_() {
        return name_;
    }

    public void setName_(String name_) {
        this.name_ = name_;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword_() {
        return password_;
    }

    public void setPassword_(String password_) {
        this.password_ = password_;
    }

    public String getDatabase_() {
        return database_;
    }

    public void setDatabase_(String database_) {
        this.database_ = database_;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }
}
