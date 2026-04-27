package com.example.back.leccion;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeccionService {

    private final LeccionRepository leccionRepo;

    public LeccionService(LeccionRepository leccionRepo) {
        this.leccionRepo = leccionRepo;
    }

    @Transactional(readOnly = true)
    public List<Leccion> listarLecciones() {
        return leccionRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Leccion> obtenerLeccionPorId(Integer id) {
        return leccionRepo.findById(id);
    }

    @Transactional
    public Leccion crearLeccion(Leccion leccion) {
        return leccionRepo.save(leccion);
    }

    @Transactional
    public Leccion actualizarLeccion(Integer id, Leccion datos) {
        Leccion existente = leccionRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Lección no encontrada: " + id));
        
        existente.setTitulo(datos.getTitulo());
        existente.setContenido(datos.getContenido()); 
        existente.setCursoId(datos.getCursoId());
        
        return leccionRepo.save(existente);
    }

    @Transactional
    public void eliminarLeccion(Integer id) {
        if (!leccionRepo.existsById(id)) {
            throw new RuntimeException("Lección no encontrada: " + id);
        }
        leccionRepo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return leccionRepo.existsById(id);
    }

    @Transactional(readOnly = true)
    public List<Leccion> obtenerLeccionesPorCurso(Integer cursoId) {
        return leccionRepo.findByCursoIdOrderByFechaCreacionAsc(cursoId);
    }
}
