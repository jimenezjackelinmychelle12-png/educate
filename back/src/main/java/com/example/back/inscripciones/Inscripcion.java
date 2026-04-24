package com.example.back.incripcion;

import java.time.LocalDateTime;

import com.example.back.curso.CursoEntity;
import com.example.back.usuario.UsuarioEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "INSCRIPCION")
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_inscripcion")
    private Integer id;

    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDateTime fechaInscripcion = LocalDateTime.now();

    @Column(name = "estado_inscripcion", nullable = false)
    private Boolean estado = true;

    // 🔥 RELACIÓN REAL CON USUARIO
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_cod_usuario", nullable = false)
    private UsuarioEntity usuario;

    // 🔥 RELACIÓN REAL CON CURSO
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_cod_curso", nullable = false)
    private CursoEntity curso;

    // ===== GETTERS & SETTERS =====

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDateTime getFechaInscripcion() { return fechaInscripcion; }
    public void setFechaInscripcion(LocalDateTime fechaInscripcion) { this.fechaInscripcion = fechaInscripcion; }

    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }

    public UsuarioEntity getUsuario() { return usuario; }
    public void setUsuario(UsuarioEntity usuario) { this.usuario = usuario; }

    public CursoEntity getCurso() { return curso; }
    public void setCurso(CursoEntity curso) { this.curso = curso; }
}