package com.smartappointment.backend.dto;

public class LoginResponse {

    private String token;
    private String role;
    private String message;
    private boolean firstTimePatient;
    private Long userId;
    private String name;

    public LoginResponse() {
    }

    public LoginResponse(String token,
                         String role,
                         String message,
                         boolean firstTimePatient,
                         Long userId,
                         String name) {

        this.token = token;
        this.role = role;
        this.message = message;
        this.firstTimePatient = firstTimePatient;
        this.userId = userId;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public boolean isFirstTimePatient() {
        return firstTimePatient;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }
}