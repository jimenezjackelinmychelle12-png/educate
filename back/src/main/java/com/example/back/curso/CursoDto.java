package com.example.back.curso;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
public class CursoDto implements Serializable {

    private Integer id;
    private String titulo;
    private String descripcion;
    private String imagenUrl;
    private Boolean activo;
    
@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fechaCreacion;
    private String categoria;
    private String etiqueta;
    private BigDecimal precio;
    private String duracionLeccion;

    // ===== CONSTRUCTOR VACÍO =====
    public CursoDto() {}

    // ===== CONSTRUCTOR COMPLETO =====
    public CursoDto(Integer id, String titulo, String descripcion, String imagenUrl,
                    Boolean activo, LocalDateTime fechaCreacion, String categoria,
                    String etiqueta, BigDecimal precio, String duracionLeccion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.activo = activo;
        this.fechaCreacion = fechaCreacion;
        this.categoria = categoria;
        this.etiqueta = etiqueta;
        this.precio = precio;
        this.duracionLeccion = duracionLeccion;
    }

    // ===== GETTERS Y SETTERS =====

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getDuracionLeccion() {
        return duracionLeccion;
    }

    public void setDuracionLeccion(String duracionLeccion) {
        this.duracionLeccion = duracionLeccion;
    }
}