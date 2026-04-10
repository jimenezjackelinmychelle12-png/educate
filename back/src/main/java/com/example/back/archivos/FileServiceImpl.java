package com.example.back.archivos;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    @Override
    public FileEntity store(MultipartFile file) throws IOException {

        // Limpiar el nombre del archivo y manejar el archivo
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // Crear la entidad de archivo a partir de los datos recibidos
        FileEntity entity = FileEntity.builder()
                .name(fileName)              // Nombre del archivo
                .type(file.getContentType()) // Tipo del archivo
                .data(file.getBytes())       // Datos binarios del archivo
                .build();

        // Guardar el archivo en la base de datos
        return fileRepository.save(entity);
    }

    @Override
    public Optional<FileEntity> getFile(UUID id) {
        return fileRepository.findById(id);  // Buscar el archivo por ID
    }

    @Override
    public List<ResponseFile> getAllFiles() {

        // Obtener todos los archivos y mapearlos a la respuesta
        return fileRepository.findAll()
                .stream()
                .map(dbFile -> {
                    // Crear la URL para descargar el archivo
                    String url = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/api/fileManager/files/")
                            .path(dbFile.getId().toString())
                            .toUriString();

                    // Crear y devolver el objeto ResponseFile
                    return ResponseFile.builder()
                            .id(dbFile.getId())
                            .name(dbFile.getName())
                            .url(url)
                            .type(dbFile.getType())
                            .size(dbFile.getData().length) // Tamaño del archivo
                            .build();
                })
                .collect(Collectors.toList());
    }
}