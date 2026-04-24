
package com.example.back.archivos;

import java.io.IOException;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fileManager")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> upload(@RequestParam("file") MultipartFile file)
            throws IOException {

        fileService.store(file);

        return ResponseEntity.ok(
                new ResponseMessage("Archivo subido correctamente")
        );
    }

    @GetMapping("/files")
    public ResponseEntity<?> getFiles() {
        return ResponseEntity.ok(fileService.getAllFiles());
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> download(@PathVariable UUID id) {

        FileEntity file = fileService.getFile(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado"));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, file.getType())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }

    
}