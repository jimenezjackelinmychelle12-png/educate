package com.example.back.archivos;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    FileEntity store(MultipartFile file) throws IOException;

    Optional<FileEntity> getFile(UUID id);

    List<ResponseFile> getAllFiles();
}