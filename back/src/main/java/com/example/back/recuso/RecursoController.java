package com.example.back.recuso;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/recursos")
public class RecursoController {

    @Autowired
    private RecursoService recursoService;

    // Entity → DTO
    private RecursoDTO toDTO(Recurso r) {
        RecursoDTO dto = new RecursoDTO();
        dto.setId(r.getId());
        dto.setNombre(r.getNombre());
        return dto;
    }

    // DTO → Entidad
    private Recurso toEntity(RecursoDTO dto) {
        Recurso r = new Recurso();
        r.setNombre(dto.getNombre());
        return r;
    }

    @GetMapping
    public ResponseEntity<List<RecursoDTO>> listar() {
        List<RecursoDTO> list = recursoService.listar()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecursoDTO> obtener(@PathVariable Integer id) {
        return recursoService.obtenerPorId(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RecursoDTO> crear(@Valid @RequestBody RecursoDTO dto) {
        Recurso saved = recursoService.crear(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {

        if (!recursoService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        recursoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}