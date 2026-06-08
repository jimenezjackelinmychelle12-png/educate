package com.example.back.respuesta;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "respuesta")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_respuesta")  // ✅ CORREGIR: usar cod_respuesta
    private Integer id;

    @Column(name = "respuesta", nullable = false)  // ✅ CORREGIR: campo se llama "respuesta", no "texto"
    private String texto;

    @Column(name = "es_correcta", nullable = false)
    private Boolean esCorrecta;

    @Column(name = "pregunta_cod_pregunta", nullable = false)  // ✅ CORREGIR: usar PREGUNTA_cod_pregunta
    private Integer preguntaId;

    // Constructor
    public Respuesta() {
        this.esCorrecta = false; // valor por defecto
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
    
    public Boolean getEsCorrecta() { return esCorrecta; }
    public void setEsCorrecta(Boolean esCorrecta) { this.esCorrecta = esCorrecta; }
    
    public Integer getPreguntaId() { return preguntaId; }
    public void setPreguntaId(Integer preguntaId) { this.preguntaId = preguntaId; }
}