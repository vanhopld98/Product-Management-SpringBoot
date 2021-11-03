package com.codegym.productmanagementspringboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping
    public String index() {
        return "/product/list";
    }

    @GetMapping("/product")
    public String listProduct() {
        return "/product/index";
    }

    @GetMapping("/login")
    public String login() {
        return "/security/login";
    }
}
