package co.edu.usa.service;


import co.edu.usa.exception.ResourceNotFoundException;
import co.edu.usa.model.Order;
import co.edu.usa.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Order createOrder(Order order) {
        if (order.getId() == null)
            order.setId(getNext());
        return orderRepository.save(order);
    }

    public List<Order> allOrder() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
        } else {
            throw new ResourceNotFoundException("Order with id: " + id + " NotFound");
        }
    }

    public Order getOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    public List<Order> allOrder_zone(String zone) {
        return orderRepository.zone(zone);
    }

    public Order updateOrder(Order order) {
        Optional<Order> orderM = orderRepository.findById(order.getId());
        if (orderM.isPresent()) {
            Order orderUpdate = orderM.get();
            orderUpdate.setStatus(order.getStatus());
            return orderRepository.save(orderUpdate);
        } else {
            throw new ResourceNotFoundException("Order with id: " + order.getId() + " NotFound");
        }
    }

    public Long getNext() {
        Order last = orderRepository.findTopByOrderByIdDesc();
        if (last != null) {
            long lastNum = last.getId();
            return lastNum + 1;
        } else {
            return 1L;
        }
    }

    public List<Order> ordersSalesManByID(Long id) {

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }

    public List<Order> ordersSalesManByDate(String dateStr, Long id) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(2).atStartOfDay())
                .and("salesMan.id").is(id);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }

    public List<Order> ordersSalesManByState(String state, Long id) {
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id)
                .and("status").is(state);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }
}
