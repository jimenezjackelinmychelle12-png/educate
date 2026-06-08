package com.example.back.pregunta;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepo;

    public PreguntaService(PreguntaRepository preguntaRepo) {
        this.preguntaRepo = preguntaRepo;
    }

    @Transactional(readOnly = true)
    public List<Pregunta> listar() {
        return preguntaRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Pregunta> obtenerPorId(Integer id) {
        return preguntaRepo.findById(id);
    }

    @Transactional
    public Pregunta crear(Pregunta pregunta) {
        return preguntaRepo.save(pregunta);
    }

    @Transactional
    public Pregunta actualizar(Integer id, Pregunta datos) {
        Pregunta existente = preguntaRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Pregunta no encontrada: " + id));
        
        existente.setTexto(datos.getTexto());
        existente.setPuntuacion(datos.getPuntuacion());
        existente.setEvaluacionId(datos.getEvaluacionId());
        
        return preguntaRepo.save(existente);
    }

    @Transactional
    public void eliminar(Integer id) {
        if (!preguntaRepo.existsById(id)) {
            throw new RuntimeException("Pregunta no encontrada: " + id);
        }
        preguntaRepo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return preguntaRepo.existsById(id);
    }
}
