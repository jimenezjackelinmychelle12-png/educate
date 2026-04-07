package com.example.back.curso;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {





    @Autowired
    private CursoRepository cursoRepository;

    // ===== LISTAR =====
    public List<CursoEntity> listar() {
        return cursoRepository.findAll();
    }

    // ===== OBTENER POR ID =====
    public Optional<CursoEntity> obtenerPorId(Integer id) {
        return cursoRepository.findById(id);
    }

    // ===== CREAR =====
    public CursoEntity guardar(CursoEntity curso) {
        return cursoRepository.save(curso);
    }

    // ===== ACTUALIZAR =====
    public CursoEntity actualizar(Integer id, CursoEntity curso) {
        return cursoRepository.findById(id).map(c -> {

            c.setTitulo(curso.getTitulo());
            c.setDescripcion(curso.getDescripcion());
            c.setImagenUrl(curso.getImagenUrl());
            c.setEtiqueta(curso.getEtiqueta());
            c.setPrecio(curso.getPrecio());
            c.setDuracionLeccion(curso.getDuracionLeccion());

            // ⚠️ NO tocar:
            // c.setFechaCreacion(...)
            // c.setActivo(...)

            return cursoRepository.save(c);

        }).orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
    }

    // ===== ELIMINAR =====
    public void eliminar(Integer id) {
        cursoRepository.deleteById(id);
    }

    // ===== EXISTE =====
    public boolean existsById(Integer id) {
        return cursoRepository.existsById(id);
    }
}