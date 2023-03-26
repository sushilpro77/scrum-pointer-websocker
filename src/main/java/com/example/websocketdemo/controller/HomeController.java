package com.example.websocketdemo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "api")
public class HomeController {
    @GetMapping("token")
    public String getUUID(){
        return UUID.randomUUID().toString();
    }

    @PostMapping("session")
    public Map getUUIDSession(@RequestBody Map<String, Object> result){
        result.put("session",UUID.randomUUID().toString());
        return result;
    }

    @GetMapping("token-test")
    public String getUUIDGet(){
        return "test";
    }
}

//user-pass -> User List<User>
//HashMap<Sting, List<User>> xxx -> rajiv, sushil, Pradip

