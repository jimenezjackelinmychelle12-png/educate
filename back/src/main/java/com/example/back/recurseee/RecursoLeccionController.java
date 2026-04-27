package com.example.back.recurseee;
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
@RequestMapping("/recurso-leccion")
public class RecursoLeccionController {

    @Autowired
    private RecursoLeccionService rlService;

    // Entity → DTO
    private RecursoLeccionDTO toDTO(RecursoLeccion rl) {
        RecursoLeccionDTO dto = new RecursoLeccionDTO();
        dto.setId(rl.getId());
        dto.setRecursoId(rl.getRecurso().getId());
        dto.setLeccionId(rl.getLeccion().getId());
        return dto;
    }

    // DTO → Entity
    private RecursoLeccion toEntity(RecursoLeccionDTO dto) {
        RecursoLeccion rl = new RecursoLeccion();
        rl.setRecurso(rlService.findRecursoById(dto.getRecursoId()));
        rl.setLeccion(rlService.findLeccionById(dto.getLeccionId()));
        return rl;
    }

    @GetMapping
    public ResponseEntity<List<RecursoLeccionDTO>> listar() {
        List<RecursoLeccionDTO> list = rlService.listar()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecursoLeccionDTO> obtener(@PathVariable Integer id) {
        return rlService.obtenerPorId(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RecursoLeccionDTO> crear(@Valid @RequestBody RecursoLeccionDTO dto) {
        RecursoLeccion saved = rlService.crear(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {

        if (!rlService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        rlService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}