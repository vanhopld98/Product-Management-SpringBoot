package com.codegym.productmanagementspringboot.repository;

import com.codegym.productmanagementspringboot.model.Category;
import com.codegym.productmanagementspringboot.service.IGeneralService;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends PagingAndSortingRepository<Category, Long> {
}
