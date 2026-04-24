package com.example.back.pregunta;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class PreguntaDTO {

    private Integer id;

    @NotBlank(message = "El texto de la pregunta no puede estar vacío")
    private String texto;

    @NotNull(message = "La puntuación es obligatoria")
    @Min(value = 1, message = "La puntuación debe ser al menos 1")
    private Integer puntuacion;

    @NotNull(message = "El ID de la evaluación es obligatorio")
    @Min(value = 1, message = "El ID de la evaluación debe ser mayor que 0")
    private Integer evaluacionId;

    private String evaluacionDescripcion;

    public PreguntaDTO() {}

    // Getters y Setters

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }
    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Integer getEvaluacionId() {
        return evaluacionId;
    }
    public void setEvaluacionId(Integer evaluacionId) {
        this.evaluacionId = evaluacionId;
    }

    public String getEvaluacionDescripcion() {
        return evaluacionDescripcion;
    }
    public void setEvaluacionDescripcion(String evaluacionDescripcion) {
        this.evaluacionDescripcion = evaluacionDescripcion;
    }
}