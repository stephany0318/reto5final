package co.edu.usa.rest;

import co.edu.usa.model.Order;
import co.edu.usa.model.Product;
import co.edu.usa.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/chocolate/")
public class ProductRest {

    @Autowired
    private ProductService productService;

    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    private List<Product> allProduct() {
        return productService.getProduct();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("new")
    private void createPrduct(@RequestBody Product product) {
        productService.createProduct(product);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("update")
    private void updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private void removeProduct(@PathVariable("id") String id) {
        productService.deleteProduct(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    private Product getProduct(@PathVariable("id") String id) {
        return productService.getProductById(id);
    }

    @GetMapping("price/{price}")
    @ResponseStatus(HttpStatus.OK)
    private List<Product> ordersPriceList(@PathVariable("price") Double price) {
        return productService.ordersPrice(price);
    }

    @GetMapping("description/{description}")
    @ResponseStatus(HttpStatus.OK)
    private List<Product> ordersDescription(@PathVariable("description") String description) {
        return productService.ordersDescription(description);
    }
}
