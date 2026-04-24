package com.example.back.incripcion;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public class InscripcionDTO {
    
    private Integer id;
    
    private LocalDateTime fechaInscripcion;
    
    private Boolean estado;
    
    private Long usuarioId;
    
    @NotNull(message = "El curso es obligatorio")
    private Integer cursoId;

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public LocalDateTime getFechaInscripcion() { return fechaInscripcion; }
    public void setFechaInscripcion(LocalDateTime fechaInscripcion) { this.fechaInscripcion = fechaInscripcion; }
    
    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }
    
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    
    public Integer getCursoId() { return cursoId; }
    public void setCursoId(Integer cursoId) { this.cursoId = cursoId; }
}