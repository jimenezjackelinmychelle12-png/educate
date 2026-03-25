package com.example.back.curso;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public List<CursoEntity> listar() {
        return cursoRepository.findAll();
    }

    public Optional<CursoEntity> obtenerPorId(Integer id) {
        return cursoRepository.findById(id);
    }

    public CursoEntity guardar(CursoEntity curso) {
        return cursoRepository.save(curso);
    }

    public CursoEntity actualizar(Integer id, CursoEntity curso) {
        return cursoRepository.findById(id).map(c -> {
            c.setTitulo(curso.getTitulo());
            c.setDescripcion(curso.getDescripcion());
            c.setImagenUrl(curso.getImagenUrl());
            c.setEtiqueta(curso.getEtiqueta());
            c.setPrecio(curso.getPrecio());
            c.setDuracionLeccion(curso.getDuracionLeccion());
            return cursoRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    }

    public void eliminar(Integer id) {
        cursoRepository.deleteById(id);
    }
}