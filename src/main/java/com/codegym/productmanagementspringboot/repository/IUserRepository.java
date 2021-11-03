package com.codegym.productmanagementspringboot.repository;

import com.codegym.productmanagementspringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
}
