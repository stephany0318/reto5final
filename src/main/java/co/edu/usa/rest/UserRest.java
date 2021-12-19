package co.edu.usa.rest;

import co.edu.usa.model.User;
import co.edu.usa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user/")
public class UserRest {

    @Autowired
    private UserService userService;

    @GetMapping("emailexist/{email}")
    @ResponseStatus(HttpStatus.OK)
    private Boolean existsEmail(@PathVariable("email") String email) {
        return userService.existsEmail(email);
    }

    @GetMapping("{email}/{password}")
    @ResponseStatus(HttpStatus.OK)
    private User authenticate(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.authenticate(email, password);
    }

    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    private List<User> allUser() {
        return userService.getUsers();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("new")
    private void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("update")
    private void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private void removeUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    private User getUser(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("birthday/{monthBirthtDay}")
    @ResponseStatus(HttpStatus.OK)
    private List<User> monthBirthtDayList(@PathVariable("monthBirthtDay") String monthBirthtDay) {
        return userService.monthBirthtDayList(monthBirthtDay);
    }
}
