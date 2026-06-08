package com.example.back.respuesta;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {

    @Autowired
    private RespuestaService respuestaService;

    // ——— Entidad → DTO ———
    private RespuestaDTO toDTO(Respuesta r) {
        RespuestaDTO dto = new RespuestaDTO();
        dto.setId(r.getId());
        dto.setTexto(r.getTexto());
        dto.setEsCorrecta(r.getEsCorrecta());
        dto.setPreguntaId(r.getPreguntaId());
        return dto;
    }

    // ——— DTO → Entidad ———
    private Respuesta toEntity(RespuestaDTO dto) {
        Respuesta r = new Respuesta();
        r.setTexto(dto.getTexto());
        r.setEsCorrecta(dto.getEsCorrecta());
        r.setPreguntaId(dto.getPreguntaId());
        return r;
    }

    @GetMapping
    public ResponseEntity<List<RespuestaDTO>> listar() {
        List<RespuestaDTO> list = respuestaService.listar()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RespuestaDTO> obtener(@PathVariable Integer id) {
        return respuestaService.obtenerPorId(id)
            .map(this::toDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RespuestaDTO> crear(@Valid @RequestBody RespuestaDTO dto) {
        Respuesta saved = respuestaService.crear(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!respuestaService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        respuestaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}