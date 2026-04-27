// Archivo: LeccionDTO.java
package com.example.back.leccion;



import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LeccionDTO {

    private Integer id;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 100, message = "El título debe tener como máximo 100 caracteres")
    private String titulo;

    @NotBlank(message = "El contenido de la lección es obligatorio")
    private String contenido;

    private LocalDateTime fechaCreacion;

    @NotNull(message = "El ID del curso no puede ser nulo")
    @Min(value = 1, message = "El ID del curso debe ser mayor que 0")
    private Integer cursoId;

    private String cursoTitulo;

    // Constructor vacío
    public LeccionDTO() {}

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Integer getCursoId() {
        return cursoId;
    }

    public void setCursoId(Integer cursoId) {
        this.cursoId = cursoId;
    }

    public String getCursoTitulo() {
        return cursoTitulo;
    }

    public void setCursoTitulo(String cursoTitulo) {
        this.cursoTitulo = cursoTitulo;
    }
}