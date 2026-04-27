package com.example.back.recuso;

import jakarta.persistence.*;

@Entity
@Table(name = "recurso")
public class Recurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_recurso")  // ✅ CORREGIR: usar cod_recurso
    private Integer id;

    @Column(name = "recurso", nullable = false)  // ✅ CORREGIR: campo se llama "recurso"
    private String nombre;

    // Constructor
    public Recurso() {}

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    // ✅ MAPEO CORRECTO según tu entidad Recurso real
    public RecursoDTO toRecursoDTO() {
        RecursoDTO dto = new RecursoDTO();
        dto.setId(this.getId());
        dto.setNombre(this.getNombre());  // ✅ Solo estos 2 campos existen
        return dto;
    }
}