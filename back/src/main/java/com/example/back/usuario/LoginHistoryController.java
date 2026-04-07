package com.example.back.usuario;


import java.util.List;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LoginHistoryController {

    private final LoginHistoryService service;

    @GetMapping
    public List<LoginHistoryEntity> getAllHistory() {
        return service.getAllHistory();
    }

    @GetMapping("/{correo}")
    public List<LoginHistoryEntity> getHistoryByUser(@PathVariable String correo) {
        return service.getHistoryByUser(correo);
    }
}
