package com.example.back.recuso;

import com.example.back.archivos.ResponseFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecursoDTO {
    private Integer id;
    private String nombre;
    private List<ResponseFile> archivos;
}
