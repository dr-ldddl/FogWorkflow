package com.ccis.fog;

public class VisitCount {

    private String userName;

    private String visitIp;

    private String visitDate;

    private String visitAddress;

    public String getUserName() {
        return userName;
    }

    public String getVisitIp() {
        return visitIp;
    }

    public String getVisitDate() {
        return visitDate;
    }

    public String getVisitAddress() {
        return visitAddress;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setVisitIp(String visitIp) {
        this.visitIp = visitIp;
    }

    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    public void setVisitAddress(String visitAddress) {
        this.visitAddress = visitAddress;
    }

    @Override
    public String toString() {
        return "visitCount{" +
                "userName='" + userName + '\'' +
                ", visitIp='" + visitIp + '\'' +
                ", visitDate='" + visitDate + '\'' +
                ", visitAddress='" + visitAddress + '\'' +
                '}';
    }
}
