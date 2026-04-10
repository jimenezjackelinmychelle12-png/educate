package com.example.back.curso;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CursoRepository extends JpaRepository<CursoEntity, Integer> {
@Query("""
    SELECT c FROM CursoEntity c
    WHERE 
        (:categoria IS NULL OR :categoria = '' OR LOWER(c.categoria) = LOWER(:categoria))
        AND (:precioMin IS NULL OR c.precio >= :precioMin)
        AND (:precioMax IS NULL OR c.precio <= :precioMax)
""")
Page<CursoEntity> filtrar(
        @Param("categoria") String categoria,
        @Param("precioMin") BigDecimal precioMin,
        @Param("precioMax") BigDecimal precioMax,
        Pageable pageable
);
}