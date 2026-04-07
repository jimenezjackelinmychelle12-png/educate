package com.example.back.auditoria;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "actividad_usuario")
public class ActividadUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer usuarioId;
    private String correo;

    private String accion;
    private String detalle;

    private String ip;
    private LocalDateTime fecha;

    public ActividadUsuario() {}

    public ActividadUsuario(Integer usuarioId, String correo,
                            String accion, String detalle,
                            String ip) {
        this.usuarioId = usuarioId;
        this.correo = correo;
        this.accion = accion;
        this.detalle = detalle;
        this.ip = ip;
        this.fecha = LocalDateTime.now();
    }

    // Getters y Setters

    public Integer getId() { return id; }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getAccion() { return accion; }
    public void setAccion(String accion) { this.accion = accion; }

    public String getDetalle() { return detalle; }
    public void setDetalle(String detalle) { this.detalle = detalle; }

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}