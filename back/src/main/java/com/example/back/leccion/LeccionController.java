package com.example.back.leccion;

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

import com.example.back.curso.CursoService;
import com.example.back.recurseee.RecursoLeccion;
import com.example.back.recurseee.RecursoLeccionService;
import com.example.back.recuso.Recurso;
import com.example.back.recuso.RecursoDTO;
import com.example.back.recuso.RecursoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/lecciones")
public class LeccionController {

    @Autowired
    private LeccionService leccionService;

    @Autowired
    private CursoService cursoService;

    @Autowired
    private RecursoLeccionService recursoLeccionService;

    @Autowired
    private RecursoService recursoService;

    // --- Mapeo Entidad → DTO ---
    private LeccionDTO toDTO(Leccion l) {
        LeccionDTO dto = new LeccionDTO();
        dto.setId(l.getId());
        dto.setTitulo(l.getTitulo());
        dto.setContenido(l.getContenido());
        dto.setFechaCreacion(l.getFechaCreacion());
        dto.setCursoId(l.getCursoId());
        return dto;
    }

    // --- Mapeo DTO → Entidad ---
    private Leccion toEntity(LeccionDTO dto) {
        Leccion l = new Leccion();
        l.setTitulo(dto.getTitulo());
        l.setContenido(dto.getContenido());
        l.setCursoId(dto.getCursoId());
        return l;
    }

    @GetMapping
    public ResponseEntity<List<LeccionDTO>> listar() {
        List<LeccionDTO> lista = leccionService.listarLecciones()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeccionDTO> obtener(@PathVariable Integer id) {
        return leccionService.obtenerLeccionPorId(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LeccionDTO> crear(@Valid @RequestBody LeccionDTO dto) {
        Leccion creada = leccionService.crearLeccion(toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(creada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeccionDTO> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody LeccionDTO dto) {

        if (!leccionService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Leccion actualizada = leccionService.actualizarLeccion(id, toEntity(dto));
        return ResponseEntity.ok(toDTO(actualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!leccionService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        leccionService.eliminarLeccion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<LeccionDTO>> obtenerLeccionesPorCurso(@PathVariable Integer cursoId) {

        if (!cursoService.existsById(cursoId)) {
            return ResponseEntity.notFound().build();
        }

        List<LeccionDTO> lecciones = leccionService.obtenerLeccionesPorCurso(cursoId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(lecciones);
    }

    @GetMapping("/{leccionId}/recursos")
    public ResponseEntity<List<RecursoDTO>> obtenerRecursosPorLeccion(@PathVariable Integer leccionId) {

        if (!leccionService.existsById(leccionId)) {
            return ResponseEntity.notFound().build();
        }

        List<RecursoDTO> recursos = recursoLeccionService.listar()
                .stream()
                .filter(rl -> rl.getLeccion().getId().equals(leccionId))
                .map(rl -> toRecursoDTOConTipo(rl.getRecurso(), rl.getTipo()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(recursos);
    }

    @PostMapping("/{leccionId}/recursos")
    public ResponseEntity<RecursoDTO> crearRecursoParaLeccion(
            @PathVariable Integer leccionId,
            @Valid @RequestBody RecursoDTO recursoDTO) {

        if (!leccionService.existsById(leccionId)) {
            return ResponseEntity.notFound().build();
        }

        try {
            Recurso nuevoRecurso = new Recurso();
            nuevoRecurso.setNombre(recursoDTO.getNombre());

            Recurso recursoCreado = recursoService.crear(nuevoRecurso);

            Leccion leccion = leccionService.obtenerLeccionPorId(leccionId).orElse(null);

            RecursoLeccion relacion = new RecursoLeccion();
            relacion.setRecurso(recursoCreado);
            relacion.setLeccion(leccion);
            relacion.setTipo(recursoDTO.getTipo() != null ? recursoDTO.getTipo() : "archivo");

            recursoLeccionService.crear(relacion);

            RecursoDTO response = toRecursoDTOConTipo(recursoCreado, relacion.getTipo());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    private RecursoDTO toRecursoDTOConTipo(Recurso r, String tipo) {
        RecursoDTO dto = new RecursoDTO();
        dto.setId(r.getId());
        dto.setNombre(r.getNombre());
        dto.setTipo(tipo);
        return dto;
    }
}