// Archivo: RecursoLeccionDTO.java
package com.example.back.recurseee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO para la asociación recurso–lección (uso en petición y respuesta).
 */
public class RecursoLeccionDTO {

    private Integer id;

    @NotBlank(message = "El tipo de recurso no puede estar vacío")
    @Size(max = 100, message = "El tipo de recurso debe tener como máximo 100 caracteres")
    private String tipoRecurso;

    @NotNull(message = "El ID del recurso no puede ser nulo")
    private Integer recursoId;

    @NotNull(message = "El ID de la lección no puede ser nulo")
    private Integer leccionId;

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipoRecurso() {
        return tipoRecurso;
    }

    public void setTipoRecurso(String tipoRecurso) {
        this.tipoRecurso = tipoRecurso;
    }

    public Integer getRecursoId() {
        return recursoId;
    }

    public void setRecursoId(Integer recursoId) {
        this.recursoId = recursoId;
    }

    public Integer getLeccionId() {
        return leccionId;
    }

    public void setLeccionId(Integer leccionId) {
        this.leccionId = leccionId;
    }
}