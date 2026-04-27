package com.example.back.leccion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeccionRepository extends JpaRepository<Leccion, Integer> {
    // ✅ Obtener lecciones por curso, ordenadas por fecha
    List<Leccion> findByCursoIdOrderByFechaCreacionAsc(Integer cursoId);

    // ✅ Contar lecciones de un curso
    @Query("SELECT COUNT(l) FROM Leccion l WHERE l.cursoId = :cursoId")
    Long countByCursoId(@Param("cursoId") Integer cursoId);
}