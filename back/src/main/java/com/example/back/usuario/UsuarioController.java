package com.example.back.usuario;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.historial.HistorialLoginService;

import jakarta.servlet.http.HttpServletRequest;







@CrossOrigin(origins = "http://localhost:3000")
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

    // 🔄 CAMBIAR TIPO
    @PutMapping("/{id}/tipo")
    public ResponseEntity<?> cambiarTipo(@PathVariable Long id,
                                         @RequestBody TipoRequest request) {

        UsuarioEntity usuario = usuarioService.buscarPorId(id);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }

        usuario.setTipo(request.getTipo());
        usuarioService.guardar(usuario);

        return ResponseEntity.ok("Tipo actualizado");
    }

    // ❌ ELIMINAR USUARIO
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {

        UsuarioEntity usuario = usuarioService.buscarPorId(id);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }

        usuarioService.eliminar(id);

        return ResponseEntity.ok("Usuario eliminado");
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public ResponseEntity<UsuarioDto> login(@RequestBody LoginRequest loginRequest,
                                            HttpServletRequest request) {

        UsuarioEntity usuario = usuarioService.buscarPorCorreo(loginRequest.getCorreo());

        if (usuario != null &&
            usuario.getPassword().equals(loginRequest.getPassword())) {

            String ip = request.getRemoteAddr();

            historialLoginService.registrarLogin(
                    Math.toIntExact(usuario.getId()),
                    usuario.getCorreo(),
                    ip
            );

            return ResponseEntity.ok(
                    new UsuarioDto(
                            usuario.getId(),
                            usuario.getNombre(),
                            usuario.getApellidoPaterno(),
                            usuario.getApellidoMaterno(),
                            usuario.getCorreo(),
                            usuario.getTipo()
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}