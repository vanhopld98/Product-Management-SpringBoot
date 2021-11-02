package com.codegym.productmanagementspringboot.service.product;

import com.codegym.productmanagementspringboot.model.Product;
import com.codegym.productmanagementspringboot.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService extends IGeneralService<Product> {
    Page<Product> findAllByNameContaining(String name, Pageable pageable);
}
