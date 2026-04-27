package com.example.back.recurseee;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back.leccion.Leccion;
import com.example.back.leccion.LeccionRepository;
import com.example.back.recuso.Recurso;
import com.example.back.recuso.RecursoRepository;

@Service
public class RecursoLeccionService {

    private final RecursoLeccionRepository rlRepo;
    private final RecursoRepository recursoRepo;
    private final LeccionRepository leccionRepo;

    public RecursoLeccionService(RecursoLeccionRepository rlRepo,
                                 RecursoRepository recursoRepo,
                                 LeccionRepository leccionRepo) {
        this.rlRepo = rlRepo;
        this.recursoRepo = recursoRepo;
        this.leccionRepo = leccionRepo;
    }

    @Transactional(readOnly = true)
    public List<RecursoLeccion> listar() {
        return rlRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<RecursoLeccion> obtenerPorId(Integer id) {
        return rlRepo.findById(id);
    }

    @Transactional
    public RecursoLeccion crear(RecursoLeccion rl) {
        return rlRepo.save(rl);
    }

    @Transactional
    public void eliminar(Integer id) {
        if (!rlRepo.existsById(id)) {
            throw new RuntimeException("Asociación no encontrada: " + id);
        }
        rlRepo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return rlRepo.existsById(id);
    }

    @Transactional(readOnly = true)
    public Recurso findRecursoById(Integer recursoId) {
        return recursoRepo.findById(recursoId)
            .orElseThrow(() -> new RuntimeException("Recurso no encontrado: " + recursoId));
    }

    @Transactional(readOnly = true)
    public Leccion findLeccionById(Integer leccionId) {
        return leccionRepo.findById(leccionId)
            .orElseThrow(() -> new RuntimeException("Lección no encontrada: " + leccionId));
    }
}
