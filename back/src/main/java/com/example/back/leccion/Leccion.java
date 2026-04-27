package com.example.back.leccion;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "leccion")
public class Leccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_leccion")  // ✅ CORREGIR: usar cod_leccion
    private Integer id;

    @Column(name = "titulo_leccion", nullable = false)  // ✅ CORREGIR: usar titulo_leccion
    private String titulo;

    @Column(name = "descripcion_leccion", nullable = false)  // ✅ CORREGIR: usar descripcion_leccion
    private String contenido;

    @Column(name = "fecha_ceracion", nullable = false)  // ✅ NOTA: hay un typo en tu BD (ceracion en lugar de creacion)
    private LocalDateTime fechaCreacion;

    @Column(name = "curso_cod_curso", nullable = false)  // ✅ CORREGIR: usar CURSO_cod_curso
    private Integer cursoId;

    // Constructor
    public Leccion() {
        this.fechaCreacion = LocalDateTime.now();
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }
    
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    
    public Integer getCursoId() { return cursoId; }
    public void setCursoId(Integer cursoId) { this.cursoId = cursoId; }
}