package com.example.back.recuso;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecursoService {

    private final RecursoRepository repo;

    public RecursoService(RecursoRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<Recurso> listar() {
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Recurso> obtenerPorId(Integer id) {
        return repo.findById(id);
    }

    @Transactional
    public Recurso crear(Recurso r) {
        return repo.save(r);
    }

    @Transactional
    public void eliminar(Integer id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Recurso no encontrado: " + id);
        }
        repo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return repo.existsById(id);
    }
}
