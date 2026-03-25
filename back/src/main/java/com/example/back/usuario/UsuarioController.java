package com.example.back.usuario;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    
   

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
       
    }

    // GET -> listar usuarios como DTO (sin contraseña)
    @GetMapping
    public List<UsuarioDto> listar() {
        return usuarioService.listarUsuarios();
    }

    @PostMapping
    public UsuarioEntity guardar(@RequestBody UsuarioEntity usuario) {
        return usuarioService.guardar(usuario);
    }

    


}
