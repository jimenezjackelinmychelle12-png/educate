package com.example.back.curso;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CursoDto implements Serializable {

    private Integer id;
    private String titulo;
    private String descripcion;
    private String imagenUrl;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private String etiqueta;
    private BigDecimal precio;
    private String duracionLeccion;

    public CursoDto() {}

    public CursoDto(Integer id, String titulo, String descripcion, String imagenUrl,
                    Boolean activo, LocalDateTime fechaCreacion, String etiqueta,
                    BigDecimal precio, String duracionLeccion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.activo = activo;
        this.fechaCreacion = fechaCreacion;
        this.etiqueta = etiqueta;
        this.precio = precio;
        this.duracionLeccion = duracionLeccion;
    }

    // Getters y Setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public String getEtiqueta() { return etiqueta; }
    public void setEtiqueta(String etiqueta) { this.etiqueta = etiqueta; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public String getDuracionLeccion() { return duracionLeccion; }
    public void setDuracionLeccion(String duracionLeccion) { this.duracionLeccion = duracionLeccion; }
}