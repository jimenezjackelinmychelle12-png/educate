package com.example.back.curso;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    // ===== LISTAR TODOS =====
    public List<CursoEntity> listar() {
        return cursoRepository.findAll();
    }

    // ===== OBTENER POR ID =====
    public Optional<CursoEntity> obtenerPorId(Integer id) {
        return cursoRepository.findById(id);
    }

    // ===== CREAR =====
    // ===== CREAR =====
    public CursoEntity crear(CursoEntity curso) {
        curso.setActivo(true);
        curso.setFechaCreacion(LocalDateTime.now());
        return cursoRepository.save(curso);
    }

    // ===== ACTUALIZAR =====
    public CursoEntity actualizar(Integer id, CursoEntity curso) {
        return cursoRepository.findById(id).map(c -> {

            c.setTitulo(curso.getTitulo());
            c.setDescripcion(curso.getDescripcion());
            c.setImagenUrl(curso.getImagenUrl());
            c.setCategoria(curso.getCategoria());
            c.setEtiqueta(curso.getEtiqueta());
            c.setPrecio(curso.getPrecio());
            c.setDuracionLeccion(curso.getDuracionLeccion());

            // NO tocar:
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

    // ===== FILTROS + PAGINACIÓN =====
    
        public Page<CursoEntity> filtrar(
            String categoria,
            BigDecimal precioMin,
            BigDecimal precioMax,
            Pageable pageable
    ) {
        return cursoRepository.filtrar(categoria, precioMin, precioMax, pageable);
    }
}