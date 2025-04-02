package com.example.cache.products;


import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/product/{id}")
    @Cacheable(value = "product", key = "#id")
    public Product getProductById(@PathVariable long id){
        Optional<Product> result = productRepository.findById(id);
        if(result.isEmpty()) {
            throw new RuntimeException();
        }
        return result.get();
    }

    @PostMapping("/product")
    public Product editProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/product/{id}")
    @CachePut(cacheNames = "product", key = "#id")
    public Product editProduct(@PathVariable long id, @RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/product/{id}")
    @CacheEvict(cacheNames = "product", key = "#id", beforeInvocation = true)
    public String removeProductById(@PathVariable long id) {
        productRepository.deleteById(id);
        return "Delete success";
    }

}
