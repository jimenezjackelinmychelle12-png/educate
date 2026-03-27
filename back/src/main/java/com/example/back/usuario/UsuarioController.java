package com.example.back.usuario;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.historial.HistorialLoginService;
import com.example.back.login.LoginRequest;

import jakarta.servlet.http.HttpServletRequest;


@CrossOrigin(origins = "http://localhost:3000") // ✅ React
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final HistorialLoginService historialLoginService;

    public UsuarioController(UsuarioService usuarioService,
                             HistorialLoginService historialLoginService) {
        this.usuarioService = usuarioService;
        this.historialLoginService = historialLoginService;
    }

    // 📋 LISTAR
    @GetMapping
    public List<UsuarioDto> listar() {
        return usuarioService.listarUsuarios();
    }

    // 💾 GUARDAR
    @PostMapping
    public UsuarioEntity guardar(@RequestBody UsuarioEntity usuario) {
        return usuarioService.guardar(usuario);
    }


    // UsuarioController.java
@PostMapping("/cambiar-password")
public ResponseEntity<String> cambiarPassword(@RequestBody PasswordChangeRequest request) {

    var usuario = usuarioService.buscarPorCorreo(request.getCorreo());

    if (usuario == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body("Usuario no encontrado");
    }

    // Cambiar la contraseña
    usuario.setPassword(request.getNuevaPassword());
    usuarioService.guardar(usuario); // Guardar cambios en DB

    return ResponseEntity.ok("Contraseña cambiada correctamente");


}




    // 🔐 LOGIN (CORREGIDO)
    @PostMapping("/login")
    public ResponseEntity<UsuarioDto> login(@RequestBody LoginRequest loginRequest,
                                            HttpServletRequest request) {

        var usuario = usuarioService.buscarPorCorreo(loginRequest.getCorreo());

        // ✅ VALIDAR antes de usar usuario
        if (usuario != null && usuario.getPassword().equals(loginRequest.getPassword())) {

            String ipCliente = request.getRemoteAddr();

            // ✅ registrar solo si login es correcto
            historialLoginService.registrarLogin(
                Math.toIntExact(usuario.getId()),
                usuario.getCorreo(),
                ipCliente
            );

            UsuarioDto dto = new UsuarioDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidoPaterno(),
                usuario.getApellidoMaterno(),
                usuario.getCorreo(),
                usuario.getTipo()
            );

            return ResponseEntity.ok(dto);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}