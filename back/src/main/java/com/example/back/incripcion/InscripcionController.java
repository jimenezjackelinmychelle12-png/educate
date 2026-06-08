package com.example.back.incripcion;

import java.util.List;
import java.util.stream.Collectors;

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
@RequestMapping("/api/inscripciones")
public class InscripcionController {

    private final InscripcionService service;

    public InscripcionController(InscripcionService service) {
        this.service = service;
    }

    // ===== MAPPER =====
    private InscripcionDTO toDTO(Inscripcion i) {
        InscripcionDTO dto = new InscripcionDTO();
        dto.setId(i.getId());
        dto.setFechaInscripcion(i.getFechaInscripcion());
        dto.setEstado(i.getEstado());
        dto.setUsuarioId(i.getUsuario().getId());
        dto.setCursoId(i.getCurso().getId());
        return dto;
    }

    // ===== CREAR =====
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody InscripcionDTO dto) {
        return ResponseEntity.ok(toDTO(service.crear(dto)));
    }

    // ===== LISTAR =====
    @GetMapping
    public List<InscripcionDTO> listar() {
        return service.listar()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ===== POR USUARIO =====
    @GetMapping("/usuario/{id}")
    public List<InscripcionDTO> porUsuario(@PathVariable Long id) {
        return service.porUsuario(id)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    

    // ===== ELIMINAR =====
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}