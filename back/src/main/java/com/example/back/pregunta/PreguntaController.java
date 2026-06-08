package com.example.back.pregunta;
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
@RequestMapping("/preguntas")
public class PreguntaController {

    @Autowired
    private PreguntaService preguntaService;

    private PreguntaDTO toDTO(Pregunta p) {
        PreguntaDTO dto = new PreguntaDTO();
        dto.setId(p.getId());
        dto.setTexto(p.getTexto());
        dto.setPuntuacion(p.getPuntuacion());
        dto.setEvaluacionId(p.getEvaluacionId());
        return dto;
    }

    private Pregunta toEntity(PreguntaDTO dto) {
        Pregunta p = new Pregunta();
        p.setTexto(dto.getTexto());
        p.setPuntuacion(dto.getPuntuacion());
        p.setEvaluacionId(dto.getEvaluacionId());
        return p;
    }

    @GetMapping
    public ResponseEntity<List<PreguntaDTO>> listar() {
        List<PreguntaDTO> list = preguntaService.listar()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreguntaDTO> obtener(@PathVariable Integer id) {
        return preguntaService.obtenerPorId(id)
            .map(this::toDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PreguntaDTO> crear(@Valid @RequestBody PreguntaDTO dto) {
        Pregunta creada = preguntaService.crear(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(creada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!preguntaService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        preguntaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}