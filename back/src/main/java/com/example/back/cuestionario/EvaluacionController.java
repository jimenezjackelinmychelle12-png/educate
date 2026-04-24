package com.example.back.cuestionario;
import java.util.List;
import java.util.stream.Collectors;

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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    // Entity → DTO
    private EvaluacionDTO toDTO(Evaluacion e) {
        EvaluacionDTO dto = new EvaluacionDTO();
        dto.setId(e.getId());
        dto.setDescripcion(e.getDescripcion());
        dto.setNumeroIntentos(e.getNumeroIntentos());
        dto.setNotaAprobacion(e.getNotaAprobacion());
        dto.setCursoId(e.getCursoId());
        return dto;
    }

    // DTO → Entity
    private Evaluacion toEntity(EvaluacionDTO dto) {
        Evaluacion e = new Evaluacion();
        e.setDescripcion(dto.getDescripcion());
        e.setNumeroIntentos(dto.getNumeroIntentos());
        e.setNotaAprobacion(dto.getNotaAprobacion());
        e.setCursoId(dto.getCursoId());
        return e;
    }

    @GetMapping
    public ResponseEntity<List<EvaluacionDTO>> listar() {
        List<EvaluacionDTO> list = evaluacionService.listar()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvaluacionDTO> obtener(@PathVariable Integer id) {
        return evaluacionService.obtenerPorId(id)
            .map(this::toDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EvaluacionDTO> crear(@Valid @RequestBody EvaluacionDTO dto) {
        Evaluacion saved = evaluacionService.crear(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EvaluacionDTO> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody EvaluacionDTO dto) {

        if (!evaluacionService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Evaluacion updated = evaluacionService.actualizar(id, toEntity(dto));
        return ResponseEntity.ok(toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!evaluacionService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        evaluacionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<EvaluacionDTO>> obtenerEvaluacionesPorCurso(@PathVariable Integer cursoId) {

        List<EvaluacionDTO> evaluaciones = evaluacionService.obtenerEvaluacionesPorCurso(cursoId)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());

        return ResponseEntity.ok(evaluaciones);
    }
}
