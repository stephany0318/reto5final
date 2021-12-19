package co.edu.usa.repository;

import co.edu.usa.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Long> {

    @Query("{email:?0}")
    User existsEmail(String email);

    @Query("{identification:?0}")
    User existsIdentification(String identification);

    @Query("{email:?0 ,password:?1}")
    User authenticate(String email, String password);

    @Query("{monthBirthtDay:?0}")
    List<User> monthBirthtDayList(String monthBirthtDay);


    User findTopByOrderByIdDesc();
}
