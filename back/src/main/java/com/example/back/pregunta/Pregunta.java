package com.example.back.pregunta;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pregunta")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_pregunta")  // ✅ CORREGIR: usar cod_pregunta
    private Integer id;

    @Column(name = "pregunta", nullable = false)  // ✅ CORREGIR: campo se llama "pregunta", no "texto"
    private String texto;

    @Column(name = "puntuacion", nullable = false)
    private Integer puntuacion;

    @Column(name = "evaluacion_cod_evaluacion", nullable = false)  // ✅ CORREGIR: usar EVALUACION_cod_evaluacion
    private Integer evaluacionId;

    // Constructor
    public Pregunta() {
        this.puntuacion = 10; // valor por defecto
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
    
    public Integer getPuntuacion() { return puntuacion; }
    public void setPuntuacion(Integer puntuacion) { this.puntuacion = puntuacion; }
    
    public Integer getEvaluacionId() { return evaluacionId; }
    public void setEvaluacionId(Integer evaluacionId) { this.evaluacionId = evaluacionId; }
}