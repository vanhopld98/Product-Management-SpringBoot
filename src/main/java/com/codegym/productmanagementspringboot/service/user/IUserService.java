package com.codegym.productmanagementspringboot.service.user;

import com.codegym.productmanagementspringboot.model.User;
import com.codegym.productmanagementspringboot.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends IGeneralService<User>, UserDetailsService {
    User findByUsername(String username);
}
