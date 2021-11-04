package com.codegym.productmanagementspringboot.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductForm {
    private Long id;
    private String name;
    private double price;
    private String description;
    private Category category;
    private MultipartFile image;
}
