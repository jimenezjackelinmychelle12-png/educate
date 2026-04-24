package com.example.back.cuestionario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_evaluacion")  // ✅ CORREGIR: usar cod_evaluacion
    private Integer id;

    @Column(name = "descipcion_evaluacion", nullable = false)  // ✅ NOTA: typo en BD (descipcion)
    private String descripcion;

    @Column(name = "numero_intentos_evaluacion", nullable = false)  // ✅ CORREGIR: usar numero_intentos_evaluacion
    private Integer numeroIntentos;

    @Column(name = "nota_aprobacion", nullable = false)  // ✅ CORREGIR: usar nota_aprobacion
    private Integer notaAprobacion;

    @Column(name = "curso_cod_curso", nullable = false)  // ✅ CORREGIR: usar CURSO_cod_curso
    private Integer cursoId;

    // Constructor
    public Evaluacion() {}

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public Integer getNumeroIntentos() { return numeroIntentos; }
    public void setNumeroIntentos(Integer numeroIntentos) { this.numeroIntentos = numeroIntentos; }
    
    public Integer getNotaAprobacion() { return notaAprobacion; }
    public void setNotaAprobacion(Integer notaAprobacion) { this.notaAprobacion = notaAprobacion; }
    
    public Integer getCursoId() { return cursoId; }
    public void setCursoId(Integer cursoId) { this.cursoId = cursoId; }
}