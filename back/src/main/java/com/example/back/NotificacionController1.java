package com.example.back.notificaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bandeja")
@CrossOrigin("http://localhost:3000")
public class NotificacionController1 {

    @Autowired
    private NotificacionService1 service;

    @GetMapping
    public Page<NotificacionDTO1> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @GetMapping("/archivadas")
    public Page<NotificacionDTO1> archivadas(Pageable pageable) {
        return service.archivadas(pageable);
    }

    @GetMapping("/papelera")
    public Page<NotificacionDTO1> papelera(Pageable pageable) {
        return service.papelera(pageable);
    }

    @PostMapping
    public NotificacionDTO1 crear(@RequestBody NotificacionRequestDTO request) {
        return service.crear(request);
    }

    @PutMapping("/{id}/leer")
    public NotificacionDTO1 leer(@PathVariable Long id) {
        return service.leer(id);
    }

    @PutMapping("/{id}/archivar")
    public NotificacionDTO1 archivar(@PathVariable Long id) {
        return service.archivar(id);
    }

    @PutMapping("/{id}/papelera")
    public NotificacionDTO1 papelera(@PathVariable Long id) {
        return service.eliminar(id);
    }

    @PutMapping("/{id}/restaurar")
    public NotificacionDTO1 restaurar(@PathVariable Long id) {
        return service.restaurar(id);
    }

    @GetMapping("/contador")
    public long contador() {
        return service.contadorNoLeidas();
    }
}