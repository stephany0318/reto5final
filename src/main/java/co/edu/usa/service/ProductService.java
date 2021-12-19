package co.edu.usa.service;

import co.edu.usa.exception.ResourceNotFoundException;
import co.edu.usa.model.Order;
import co.edu.usa.model.Product;
import co.edu.usa.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    public Product createProduct(Product user) {
        return productRepository.save(user);
    }

    public Product updateProduct(Product product) {
        Optional<Product> productM = productRepository.findById(product.getReference());
        if (productM.isPresent()) {
            Product productUpdate = productM.get();
            productUpdate.setReference(product.getReference());
            productUpdate.setCategory(product.getCategory());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setAvailability(product.getAvailability());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setQuantity(product.getQuantity());
            productUpdate.setPhotography(product.getPhotography());
            return productRepository.save(productUpdate);
        } else {
            throw new ResourceNotFoundException("Product with id: " + product.getReference() + " NotFound");
        }
    }

    public void deleteProduct(String id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.delete(product.get());
        } else {
            throw new ResourceNotFoundException("Product with id: " + id + " NotFound");
        }
    }

    public Product getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    public List<Product> ordersDescription(String description) {
        Query query = new Query();
        String value = ".*" + description + ".*";
        Criteria dateCriteria = Criteria.where("description").regex(value);

        query.addCriteria(dateCriteria);
        List<Product> products = mongoTemplate.find(query, Product.class);

        return products;
    }

    public List<Product> ordersPrice(Double price) {
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("price").lte(price);

        query.addCriteria(dateCriteria);
        List<Product> products = mongoTemplate.find(query, Product.class);

        return products;
    }
}
