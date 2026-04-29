package com.example.back.recuso;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecursoService {

    private final RecursoRepository repository;

    public List<Recurso> listar() {
        return repository.findAll();
    }

    public Optional<Recurso> obtenerPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Recurso crear(Recurso r) {
        return repository.save(r);
    }

    @Transactional
    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
