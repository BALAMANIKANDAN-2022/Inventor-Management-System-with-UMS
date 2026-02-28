package com.example.usermanagementsystem.Controller;

import com.example.usermanagementsystem.Pojo.User;
import com.example.usermanagementsystem.Pojo.UserDto;
import com.example.usermanagementsystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/home")
    public String homePage(){
        return "Welcome to User Management System";
    }
    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.registerUser(user);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> getAllUser(){
        return userService.getAllUser()
                .stream()
                .map(u -> new UserDto(u.getId(), u.getName(), u.getEmail(), u.getRole()))
                .toList();
    }

    @GetMapping("/profile")
    public UserDto getProfile(Authentication authentication) {

        String email = authentication.getName(); // from JWT

        User user = userService.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }
}
