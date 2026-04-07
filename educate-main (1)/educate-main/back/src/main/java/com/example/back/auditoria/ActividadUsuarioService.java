package com.example.back.auditoria;

import org.springframework.stereotype.Service;

@Service
public class ActividadUsuarioService {

    private final ActividadUsuarioRepository repository;

    public ActividadUsuarioService(ActividadUsuarioRepository repository) {
        this.repository = repository;
    }

    public void registrar(Integer usuarioId,
                          String correo,
                          String accion,
                          String detalle,
                          String ip) {

        ActividadUsuario actividad = new ActividadUsuario(
                usuarioId, correo, accion, detalle, ip
        );

        repository.save(actividad);
    }
}