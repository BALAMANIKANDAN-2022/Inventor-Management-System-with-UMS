package com.example.usermanagementsystem.Repositories;

import com.example.usermanagementsystem.Pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
