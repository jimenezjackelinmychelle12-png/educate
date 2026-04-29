package com.example.back.recuso;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.archivos.FileEntity;
import com.example.back.archivos.ResponseFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/recursos")
@RequiredArgsConstructor
public class RecursoController {

    private final RecursoService service;

    @GetMapping
    public List<RecursoDTO> listar() {
        return service.listar().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecursoDTO> obtener(@PathVariable Integer id) {
        return service.obtenerPorId(id)
                .map(r -> ResponseEntity.ok(toDTO(r)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RecursoDTO> crear(@RequestBody RecursoDTO dto) {
        Recurso r = Recurso.builder()
                .nombre(dto.getNombre())
                .build();
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toDTO(service.crear(r)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    private RecursoDTO toDTO(Recurso r) {
        return RecursoDTO.builder()
                .id(r.getId())
                .nombre(r.getNombre())
                .archivos(r.getArchivos() != null ? 
                    r.getArchivos().stream().map(this::toFileDTO).collect(Collectors.toList()) : null)
                .build();
    }

    private ResponseFile toFileDTO(FileEntity f) {
        return ResponseFile.builder()
                .id(f.getId())
                .name(f.getName())
                .type(f.getType())
                .size(f.getData() != null ? (long) f.getData().length : 0L)
                .build();
    }
}
