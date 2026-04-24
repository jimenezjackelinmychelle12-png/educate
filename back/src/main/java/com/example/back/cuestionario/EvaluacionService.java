package com.example.back.cuestionario;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EvaluacionService {

    private final EvaluacionRepository evalRepo;

    public EvaluacionService(EvaluacionRepository evalRepo) {
        this.evalRepo = evalRepo;
    }

    @Transactional(readOnly = true)
    public List<Evaluacion> listar() {
        return evalRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Evaluacion> obtenerPorId(Integer id) {
        return evalRepo.findById(id);
    }

    @Transactional
    public Evaluacion crear(Evaluacion eval) {
        return evalRepo.save(eval);
    }

    @Transactional
    public Evaluacion actualizar(Integer id, Evaluacion datos) {
        Evaluacion existente = evalRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Evaluación no encontrada: " + id));
        
        existente.setDescripcion(datos.getDescripcion());
        existente.setNumeroIntentos(datos.getNumeroIntentos());  
        existente.setNotaAprobacion(datos.getNotaAprobacion());  
        existente.setCursoId(datos.getCursoId());  
        
        return evalRepo.save(existente);
    }

    @Transactional
    public void eliminar(Integer id) {
        if (!evalRepo.existsById(id)) {
            throw new RuntimeException("Evaluación no encontrada: " + id);
        }
        evalRepo.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return evalRepo.existsById(id);
    }

    public List<Evaluacion> obtenerEvaluacionesPorCurso(Integer cursoId) {
        return evalRepo.findByCursoId(cursoId);
    }
}
