package com.example.back.historial;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistorialLoginService {

    private final HistorialLoginRepository historialLoginRepository;

    public HistorialLoginService(HistorialLoginRepository historialLoginRepository) {
        this.historialLoginRepository = historialLoginRepository;
    }

    public HistorialLogin registrarLogin(Integer idUsuario, String correo, String ip) {
        HistorialLogin registro = new HistorialLogin(idUsuario, correo, ip);
        return historialLoginRepository.save(registro);
    }

    public List<HistorialLogin> obtenerPorCorreo(String correo) {
        return historialLoginRepository.findByCorreo(correo);
    }

    public List<HistorialLogin> obtenerPorUsuario(Integer idUsuario) {
        return historialLoginRepository.findByUsuario(idUsuario);
    }

    public List<HistorialLogin> listarTodos() {
        return historialLoginRepository.findAll();
    }
}