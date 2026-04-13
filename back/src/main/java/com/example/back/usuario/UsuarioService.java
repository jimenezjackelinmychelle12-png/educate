package com.example.back.usuario;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 📋 LISTAR ENTIDADES
    public List<UsuarioEntity> listar() {
        return usuarioRepository.findAll();
    }

    // 📋 LISTAR DTO (para React)
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

    // 💾 GUARDAR
    public UsuarioEntity guardar(UsuarioEntity usuario) {
        return usuarioRepository.save(usuario);
    }

    // 🔍 BUSCAR POR ID
    public UsuarioEntity buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // 🔍 BUSCAR POR CORREO
    public UsuarioEntity buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo).orElse(null);
    }

    // ❌ ELIMINAR
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

}    