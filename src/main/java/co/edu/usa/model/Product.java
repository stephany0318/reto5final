package co.edu.usa.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Product")
public class Product {
    @Id
    private String reference;

    private String category;

    private String description;

    private Boolean availability;

    private Double price;

    private Integer quantity;

    private String photography;

}
