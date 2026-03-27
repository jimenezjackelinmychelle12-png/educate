package com.example.back.historial;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialLoginRepository extends JpaRepository<HistorialLogin, Integer> {

    @Query("SELECT h FROM HistorialLogin h WHERE h.correo = :correo ORDER BY h.fechaHora DESC")
    List<HistorialLogin> findByCorreo(String correo);

    @Query("SELECT h FROM HistorialLogin h WHERE h.idUsuario = :idUsuario ORDER BY h.fechaHora DESC")
    List<HistorialLogin> findByUsuario(Integer idUsuario);
}