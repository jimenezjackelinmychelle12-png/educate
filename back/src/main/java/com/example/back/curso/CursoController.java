package com.example.back.curso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public List<CursoEntity> listar() {
        return cursoService.listar();
    }

    @GetMapping("/{id}")
    public CursoEntity obtener(@PathVariable Integer id) {
        return cursoService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    }

    @PostMapping
    public CursoEntity crear(@RequestBody CursoEntity curso) {
        return cursoService.guardar(curso);
    }

    @PutMapping("/{id}")
    public CursoEntity actualizar(@PathVariable Integer id, @RequestBody CursoEntity curso) {
        return cursoService.actualizar(id, curso);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        cursoService.eliminar(id);
    }
}