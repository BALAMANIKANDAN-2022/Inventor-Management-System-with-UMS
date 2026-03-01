package com.example.usermanagementsystem.Controller;

import com.example.usermanagementsystem.Pojo.User;
import com.example.usermanagementsystem.Repositories.UserRepository;
import com.example.usermanagementsystem.Security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(dbUser.getEmail(), dbUser.getRole());

        return Map.of(
                "token", token,
                "role", dbUser.getRole()
        );
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;

    }

    @PostMapping("/reset-password")
    public Map<String,String> resetPassword(
            @RequestParam String token,
            @RequestBody Map<String, String> request) {

        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

        String email = jwtUtil.extractUsername(token);
        String newPassword = request.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        System.out.println("Password reset successful");
        return Map.of("message","Password reset successful");
    }


}

