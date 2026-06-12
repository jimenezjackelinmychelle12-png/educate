package com.example.back.notificaciones;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificacionRepository1 extends JpaRepository<Notificacion1, Long> {

    Page<Notificacion1> findByEliminadoFalse(Pageable pageable);

    Page<Notificacion1> findByArchivadoTrueAndEliminadoFalse(Pageable pageable);

    Page<Notificacion1> findByEliminadoTrue(Pageable pageable);

    long countByLeidoFalseAndEliminadoFalse();
}