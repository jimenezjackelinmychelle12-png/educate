package com.example.back.curso;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    // ===== LISTAR =====
    @GetMapping
    public ResponseEntity<List<CursoDto>> listar() {
        List<CursoDto> lista = cursoService.listar()
                .stream()
                .map(this::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // ===== OBTENER =====
    @GetMapping("/{id}")
    public ResponseEntity<CursoDto> obtener(@PathVariable Integer id) {
        return cursoService.obtenerPorId(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===== CREAR =====
    @PostMapping
    public ResponseEntity<CursoDto> crear(@RequestBody CursoDto dto) {
        CursoEntity curso = toEntity(dto);

        // @PrePersist maneja fechaCreacion y activo
        CursoEntity creado = cursoService.guardar(curso);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toDTO(creado));
    }

    // ===== ACTUALIZAR =====
    @PutMapping("/{id}")
    public ResponseEntity<CursoDto> actualizar(@PathVariable Integer id,
                                               @RequestBody CursoDto dto) {
        try {
            CursoEntity curso = toEntity(dto);
            CursoEntity actualizado = cursoService.actualizar(id, curso);

            return ResponseEntity.ok(toDTO(actualizado));

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ===== ELIMINAR =====
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {

        if (!cursoService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        cursoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ===== MAPEOS =====

    private CursoDto toDTO(CursoEntity c) {
        CursoDto dto = new CursoDto();
        dto.setId(c.getId());
        dto.setTitulo(c.getTitulo());
        dto.setDescripcion(c.getDescripcion());
        dto.setImagenUrl(c.getImagenUrl());
        dto.setActivo(c.getActivo());
        dto.setFechaCreacion(c.getFechaCreacion());
        dto.setEtiqueta(c.getEtiqueta());
        dto.setPrecio(c.getPrecio());
        dto.setDuracionLeccion(c.getDuracionLeccion());
        return dto;
    }

    private CursoEntity toEntity(CursoDto dto) {
        CursoEntity c = new CursoEntity();
        c.setTitulo(dto.getTitulo());
        c.setDescripcion(dto.getDescripcion());
        c.setImagenUrl(dto.getImagenUrl());
        c.setEtiqueta(dto.getEtiqueta());
        c.setPrecio(dto.getPrecio());
        c.setDuracionLeccion(dto.getDuracionLeccion());
        return c;
    }
}
