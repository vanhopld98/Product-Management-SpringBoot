package com.codegym.productmanagementspringboot.repository;

import com.codegym.productmanagementspringboot.model.Role;
import com.codegym.productmanagementspringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
}
