package com.ccis.fog;

public class User {

    private String username;

    private String password;

    private String email;

    private String address;

    private String organization;

    private String telnumber;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getOrganization() {
        return organization;
    }

    public String getTelnumber() {
        return telnumber;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public void setTelnumber(String telnumber) {
        this.telnumber = telnumber;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", organization='" + organization + '\'' +
                ", telnumber='" + telnumber + '\'' +
                '}';
    }
}
