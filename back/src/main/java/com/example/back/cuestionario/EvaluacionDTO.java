package com.example.back.cuestionario;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EvaluacionDTO {
    private Integer id;
    
    @NotBlank(message = "La descripción de la evaluación es obligatoria")
    private String descripcion;
    
    @NotNull(message = "El número de intentos es obligatorio")
    @Min(value = 1, message = "El número de intentos debe ser mayor a 0")
    private Integer numeroIntentos;
    
    @NotNull(message = "La nota de aprobación es obligatoria")
    @Min(value = 0, message = "La nota de aprobación debe ser mayor o igual a 0")
    private Integer notaAprobacion;
    
    @NotNull(message = "El ID del curso es obligatorio")
    private Integer cursoId;
    
    private String cursoTitulo;  // Para mostrar en responses

    // Constructors
    public EvaluacionDTO() {}

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
    
    public String getCursoTitulo() { return cursoTitulo; }
    public void setCursoTitulo(String cursoTitulo) { this.cursoTitulo = cursoTitulo; }
}