package com.example.back.archivos;

import java.io.FileNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class FileManagerExceptionHandler {

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ResponseMessage> handleNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ResponseMessage("Archivo no encontrado"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessage> handleError(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseMessage("Error: " + e.getMessage()));
    }
}