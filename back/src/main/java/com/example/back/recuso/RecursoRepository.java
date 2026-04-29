package com.example.back.recuso;


import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecursoRepository extends JpaRepository<Recurso, Integer> {
    
    @Override
    @EntityGraph(attributePaths = {"archivos"})
    List<Recurso> findAll();
}
