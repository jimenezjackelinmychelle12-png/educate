package com.example.back.respuesta;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RespuestaService {

    private final RespuestaRepository respuestaRepo;

    public RespuestaService(RespuestaRepository respuestaRepo) {
        this.respuestaRepo = respuestaRepo;
    }

    @Transactional(readOnly = true)
    public List<Respuesta> listar() {
        return respuestaRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Respuesta> obtenerPorId(Integer id) {
        return respuestaRepo.findById(id);
    }

    @Transactional
    public Respuesta crear(Respuesta respuesta) {
        return respuestaRepo.save(respuesta);
    }

    @Transactional
    public Respuesta actualizar(Integer id, Respuesta datos) {
        Respuesta existente = respuestaRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Respuesta no encontrada: " + id));
        
        existente.setTexto(datos.getTexto());
        existente.setEsCorrecta(datos.getEsCorrecta());
        existente.setPreguntaId(datos.getPreguntaId());
        
        return respuestaRepo.save(existente);
    }

    @Transactional
    public void eliminar(Integer id) {
        if (!respuestaRepo.existsById(id)) {
            throw new RuntimeException("Respuesta no encontrada: " + id);
        }
        respuestaRepo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return respuestaRepo.existsById(id);
    }
}
