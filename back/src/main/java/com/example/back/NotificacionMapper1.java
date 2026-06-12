package com.example.back.notificaciones;


public class NotificacionMapper1 {

    public static NotificacionDTO1 toDTO(
            Notificacion1 entity) {

        NotificacionDTO1 dto =
                new NotificacionDTO1();

        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setMensaje(entity.getMensaje());
        dto.setEmailEmisor(entity.getEmailEmisor());
        dto.setEmailDestino(entity.getEmailDestino());
        dto.setFechaEnvio(entity.getFechaEnvio());
        dto.setLeido(entity.isLeido());
        dto.setArchivado(entity.isArchivado());
        dto.setEliminado(entity.isEliminado());

        return dto;
    }

    public static Notificacion1 toEntity(
            NotificacionRequestDTO dto) {

        Notificacion1 entity =
                new Notificacion1();

        entity.setTitulo(dto.getTitulo());
        entity.setMensaje(dto.getMensaje());
        entity.setEmailEmisor(dto.getEmailEmisor());
        entity.setEmailDestino(dto.getEmailDestino());

        return entity;
    }
}