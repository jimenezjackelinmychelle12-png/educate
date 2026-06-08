package com.example.back.historial;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/historial-login")
@CrossOrigin(origins = "http://localhost:4200")
public class HistorialLoginController {

    private final HistorialLoginService historialLoginService;

    public HistorialLoginController(HistorialLoginService historialLoginService) {
        this.historialLoginService = historialLoginService;
    }

    @GetMapping
    public List<HistorialLogin> listarTodos() {
        return historialLoginService.listarTodos();
    }

    @GetMapping("/correo/{correo}")
    public List<HistorialLogin> obtenerPorCorreo(@PathVariable String correo) {
        return historialLoginService.obtenerPorCorreo(correo);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<HistorialLogin> obtenerPorUsuario(@PathVariable Integer idUsuario) {
        return historialLoginService.obtenerPorUsuario(idUsuario);
    }

    @PostMapping
    public ResponseEntity<HistorialLogin> registrar(@RequestBody HistorialLogin historial) {
        HistorialLogin guardado = historialLoginService.registrarLogin(
                historial.getIdUsuario(),
                historial.getCorreo(),
                historial.getIp()
        );
        return ResponseEntity.ok(guardado);
    }
}