package com.example.back.notificaciones;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NotificacionService1 {

    @Autowired
    private NotificacionRepository1 repository;

    public Page<NotificacionDTO1> listar(Pageable pageable) {
        return repository.findByEliminadoFalse(pageable)
                .map(NotificacionMapper1::toDTO);
    }

    public Page<NotificacionDTO1> archivadas(Pageable pageable) {
        return repository.findByArchivadoTrueAndEliminadoFalse(pageable)
                .map(NotificacionMapper1::toDTO);
    }

    public Page<NotificacionDTO1> papelera(Pageable pageable) {
        return repository.findByEliminadoTrue(pageable)
                .map(NotificacionMapper1::toDTO);
    }

    public NotificacionDTO1 crear(NotificacionRequestDTO request) {

        Notificacion1 n = NotificacionMapper1.toEntity(request);

        n.setFechaEnvio(LocalDateTime.now());
        n.setLeido(false);
        n.setArchivado(false);
        n.setEliminado(false);

        return NotificacionMapper1.toDTO(repository.save(n));
    }

    public NotificacionDTO1 leer(Long id) {
        Notificacion1 n = repository.findById(id).orElseThrow();
        n.setLeido(true);
        return NotificacionMapper1.toDTO(repository.save(n));
    }

    public NotificacionDTO1 archivar(Long id) {
        Notificacion1 n = repository.findById(id).orElseThrow();
        n.setArchivado(true);
        return NotificacionMapper1.toDTO(repository.save(n));
    }

    public NotificacionDTO1 eliminar(Long id) {
        Notificacion1 n = repository.findById(id).orElseThrow();
        n.setEliminado(true);
        return NotificacionMapper1.toDTO(repository.save(n));
    }

    public NotificacionDTO1 restaurar(Long id) {
        Notificacion1 n = repository.findById(id).orElseThrow();
        n.setEliminado(false);
        n.setArchivado(false);
        return NotificacionMapper1.toDTO(repository.save(n));
    }

    public long contadorNoLeidas() {
        return repository.countByLeidoFalseAndEliminadoFalse();
    }
}