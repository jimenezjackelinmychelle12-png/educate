package com.example.back.usuario;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginHistoryService {

    private final LoginHistoryRepository repository;
    private final UsuarioRepository usuarioRepository;

    public void logLoginAttempt(String correo, boolean success, HttpServletRequest request) {
        UsuarioEntity user = usuarioRepository.findByCorreo(correo).orElse(null);
        LoginHistoryEntity record = LoginHistoryEntity.builder()
            .user(user)
            .loginTime(LocalDateTime.now())
            .ipAddress(request.getRemoteAddr())
            .userAgent(request.getHeader("User-Agent"))
            .success(success)
            .build();
        repository.save(record);
    }

    public List<LoginHistoryEntity> getAllHistory() { return repository.findAll(); }
    public List<LoginHistoryEntity> getHistoryByUser(String correo) {
        UsuarioEntity user = usuarioRepository.findByCorreo(correo).orElseThrow();
        return repository.findByUser(user);
    }
}