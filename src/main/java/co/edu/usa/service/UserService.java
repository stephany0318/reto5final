package co.edu.usa.service;

import co.edu.usa.exception.ResourceNotFoundException;
import co.edu.usa.model.User;
import co.edu.usa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Boolean existsEmail(String email) {
        return userRepository.existsEmail(email) != null;
    }

    public Boolean existsIdentification(String identification) {
        return userRepository.existsIdentification(identification) != null;
    }

    public User authenticate(String email, String password) {
        User us = userRepository.authenticate(email, password);
        if (us == null) {
            User res = new User();
            res.setId(null);
            res.setName(null);
            res.setIdentification(null);
            res.setAddress(null);
            res.setCellPhone(null);
            res.setEmail(null);
            res.setPassword(null);
            res.setZone(null);
            res.setType(null);
            return res;
        }
        return us;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        if (user.getId() == null)
            user.setId(getNext());
        if (!existsEmail(user.getEmail())
                && !existsIdentification(user.getIdentification())) {
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUser(User user) {
        Optional<User> userM = userRepository.findById(user.getId());
        if (userM.isPresent()) {
            User userUpdate = userM.get();
            userUpdate.setId(user.getId());
            userUpdate.setName(user.getName());
            userUpdate.setIdentification(user.getIdentification());
            userUpdate.setAddress(user.getAddress());
            userUpdate.setCellPhone(user.getCellPhone());
            userUpdate.setEmail(user.getEmail());
            userUpdate.setPassword(user.getPassword());
            userUpdate.setZone(user.getZone());
            userUpdate.setType(user.getType());
            userUpdate.setBirthtDay(user.getBirthtDay());
            userUpdate.setMonthBirthtDay(user.getMonthBirthtDay());
            return userRepository.save(userUpdate);
        } else {
            throw new ResourceNotFoundException("User with id: " + user.getId() + " NotFound");
        }
    }

    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new ResourceNotFoundException("User with id: " + id + " NotFound");
        }
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public Long getNext() {
        User last = userRepository.findTopByOrderByIdDesc();
        if (last != null) {
            long lastNum = last.getId();
            return lastNum + 1;
        } else {
            return 1L;
        }
    }

    public List<User> monthBirthtDayList(String monthBirthtDay) {
        return userRepository.monthBirthtDayList(monthBirthtDay);
    }
}

