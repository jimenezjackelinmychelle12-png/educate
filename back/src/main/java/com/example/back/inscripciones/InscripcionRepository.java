package com.example.back.incripcion;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface InscripcionRepository extends JpaRepository<Inscripcion, Integer> {

    List<Inscripcion> findByUsuario_Id(Long usuarioId);

    boolean existsByUsuario_IdAndCurso_Id(Long usuarioId, Integer cursoId);
}