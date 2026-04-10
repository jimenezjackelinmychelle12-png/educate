package com.example.back.curso;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // ✅ React
@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    // ===== LISTAR CON FILTROS + PAGINACIÓN 
  
    @GetMapping
public ResponseEntity<Page<CursoDto>> listar(
        @RequestParam(defaultValue = "0") int pageNumber,
        @RequestParam(defaultValue = "6") int pageSize,
        @RequestParam(required = false) String categoria,
        @RequestParam(required = false) BigDecimal precioMin,
        @RequestParam(required = false) BigDecimal precioMax
) {

    try {

        // 🔥 SOLUCIÓN CLAVE
        categoria = limpiar(categoria);

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<CursoDto> resultado = cursoService
                .filtrar(categoria, precioMin, precioMax, pageable)
                .map(this::toDTO);

        return ResponseEntity.ok(resultado);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.ok(Page.empty());
    }
}
    // 🔥 limpiar strings vacíos
    private String limpiar(String valor) {
        return (valor == null || valor.trim().isEmpty()) ? null : valor;
    }


    // ===== OBTENER POR ID =====
    @GetMapping("/{id}")
    public ResponseEntity<CursoDto> obtener(@PathVariable Integer id) {
        Optional<CursoEntity> curso = cursoService.obtenerPorId(id);
        return curso.map(c -> ResponseEntity.ok(toDTO(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ===== CREAR =====
    @PostMapping
public ResponseEntity<?> crear(@RequestBody(required = false) String body) {
    System.out.println("BODY: " + body);
    return ResponseEntity.ok("ok");
}
    // ===== ACTUALIZAR =====
    @PutMapping("/{id}")
    public ResponseEntity<CursoDto> actualizar(
            @PathVariable Integer id,
            @RequestBody CursoDto dto
    ) {
        try {
            CursoEntity actualizado = cursoService.actualizar(id, toEntity(dto));
            return ResponseEntity.ok(toDTO(actualizado));
        } catch (Exception e) {
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
        dto.setCategoria(c.getCategoria());
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
        c.setCategoria(dto.getCategoria());
        c.setEtiqueta(dto.getEtiqueta());
        c.setPrecio(dto.getPrecio());
        c.setDuracionLeccion(dto.getDuracionLeccion());
        c.setFechaCreacion(dto.getFechaCreacion());
        return c;
    }
}