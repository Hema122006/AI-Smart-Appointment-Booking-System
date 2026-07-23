package com.smartappointment.backend.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "MySuperSecretKeyForSmartAppointmentSystem2026SecureKey123";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String mobileNumber) {

        return Jwts.builder()
                .setSubject(mobileNumber)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractMobileNumber(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, String mobileNumber) {

        return extractMobileNumber(token).equals(mobileNumber);
    }

}