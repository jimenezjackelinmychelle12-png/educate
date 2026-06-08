package com.example.back.incripcion;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.back.curso.CursoEntity;
import com.example.back.curso.CursoRepository;
import com.example.back.usuario.UsuarioEntity;
import com.example.back.usuario.UsuarioRepository;

@Service
public class InscripcionService {

    private final InscripcionRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final CursoRepository cursoRepo;

    public InscripcionService(InscripcionRepository repo,
                              UsuarioRepository usuarioRepo,
                              CursoRepository cursoRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.cursoRepo = cursoRepo;
    }

    public Inscripcion crear(InscripcionDTO dto) {

        UsuarioEntity usuario = usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        CursoEntity curso = cursoRepo.findById(dto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no existe"));

        if (repo.existsByUsuario_IdAndCurso_Id(usuario.getId(), curso.getId())) {
            throw new RuntimeException("El usuario ya está inscrito en este curso");
        }

        Inscripcion i = new Inscripcion();
        i.setUsuario(usuario);
        i.setCurso(curso);

        return repo.save(i);
    }

    public List<Inscripcion> listar() {
        return repo.findAll();
    }

    public List<Inscripcion> porUsuario(Long usuarioId) {
        return repo.findByUsuario_Id(usuarioId);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}