package co.edu.usa.repository;

import co.edu.usa.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Long> {

    @Query("{salesMan_zone:?0}")
    List<Order> zone(String zone);

    Order findTopByOrderByIdDesc();
}
