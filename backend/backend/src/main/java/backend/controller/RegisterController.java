package backend.controller;

import backend.dto.RegisterRequest;
import backend.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return registerService.register(request);
    }
}