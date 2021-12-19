package co.edu.usa.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "order")
public class Order {

    @Id
    private Long id;

    private Date registerDay;

    private String status;

    private User salesMan;

    private Map<String, Product> products;

    private Map<String, Integer> quantities;
}
