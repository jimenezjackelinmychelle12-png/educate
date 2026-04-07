package com.example.back.historial;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_login")
public class HistorialLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLog;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    private String correo;
    private String ip;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    public HistorialLogin() {
        this.fechaHora = LocalDateTime.now();
    }

    public HistorialLogin(Integer idUsuario, String correo, String ip) {
        this.idUsuario = idUsuario;
        this.correo = correo;
        this.ip = ip;
        this.fechaHora = LocalDateTime.now();
    }

    // Getters y setters
    public Integer getIdLog() { return idLog; }
    public void setIdLog(Integer idLog) { this.idLog = idLog; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
}