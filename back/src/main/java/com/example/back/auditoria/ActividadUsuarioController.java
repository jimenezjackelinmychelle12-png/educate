package com.example.back.auditoria;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actividad")
@CrossOrigin
public class ActividadUsuarioController {

    private final ActividadUsuarioRepository repository;

    public ActividadUsuarioController(ActividadUsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ActividadUsuario> listar() {
        return repository.findAll();
    }
}