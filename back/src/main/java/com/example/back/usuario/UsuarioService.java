package com.example.back.usuario;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    // Listar usuarios como DTO
    public List<UsuarioDto> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(u -> new UsuarioDto(
                        u.getId(),
                        u.getNombre(),
                        u.getApellidoPaterno(),
                        u.getApellidoMaterno(),
                        u.getCorreo(),
                        u.getTipo()
                ))
                .collect(Collectors.toList());
    }

    // Guardar un usuario

    public UsuarioEntity guardar(UsuarioEntity usuario) {
        UsuarioEntity guardado = usuarioRepository.save(usuario);

        return guardado;
    }

    // Buscar por correo
    public UsuarioEntity buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo).orElse(null);
    }

}

