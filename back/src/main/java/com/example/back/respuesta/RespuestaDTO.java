package com.example.back.respuesta;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para respuestas (uso en petición y respuesta).
 */
public class RespuestaDTO {

    private Integer id;

    @NotBlank(message = "El texto de la respuesta no puede estar vacío")
    private String texto;

    @NotNull(message = "Debe indicarse si la respuesta es correcta o no")
    private Boolean esCorrecta;

    @NotNull(message = "El ID de la pregunta no puede ser nulo")
    @Min(value = 1, message = "El ID de la pregunta debe ser mayor que 0")
    private Integer preguntaId;

    private String preguntaTexto;  // Para mostrar en responses

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

    public Boolean getEsCorrecta() {
        return esCorrecta;
    }

    public void setEsCorrecta(Boolean esCorrecta) {
        this.esCorrecta = esCorrecta;
    }

    public Integer getPreguntaId() {
        return preguntaId;
    }

    public void setPreguntaId(Integer preguntaId) {
        this.preguntaId = preguntaId;
    }

    public String getPreguntaTexto() {
        return preguntaTexto;
    }

    public void setPreguntaTexto(String preguntaTexto) {
        this.preguntaTexto = preguntaTexto;
    }
}