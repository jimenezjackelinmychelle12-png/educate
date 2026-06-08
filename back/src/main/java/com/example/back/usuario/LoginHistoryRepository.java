package com.example.back.usuario;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginHistoryRepository extends JpaRepository<LoginHistoryEntity, Long> {
    List<LoginHistoryEntity> findByUser(UsuarioEntity user);
}
