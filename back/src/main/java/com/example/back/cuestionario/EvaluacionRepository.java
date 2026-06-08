package com.example.back.cuestionario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;



public interface EvaluacionRepository extends JpaRepository<Evaluacion, Integer> {
    List<Evaluacion> findByCursoId(Integer cursoId);
}