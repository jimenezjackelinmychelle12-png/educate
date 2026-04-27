package com.example.back.recuso;


import jakarta.validation.constraints.NotBlank;

public class RecursoDTO {

    private Integer id;
    
    @NotBlank(message = "El nombre del recurso es obligatorio")
    private String nombre;
    
    private String tipo;

    // Constructor vacío
    public RecursoDTO() {}

    // Getters y Setters
    public Integer getId() { 
        return id; 
    }

    public void setId(Integer id) { 
        this.id = id; 
    }
    
    public String getNombre() { 
        return nombre; 
    }

    public void setNombre(String nombre) { 
        this.nombre = nombre; 
    }
    
    public String getTipo() { 
        return tipo; 
    }

    public void setTipo(String tipo) { 
        this.tipo = tipo; 
    }
}