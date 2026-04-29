package com.example.back.recuso;


import com.example.back.archivos.FileEntity;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recursos") // Cambiamos el nombre de la tabla para evitar conflicto con la columna
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recurso") // Nombre claro para la PK
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @OneToMany(mappedBy = "recurso", 
               fetch = FetchType.LAZY, 
               cascade = CascadeType.ALL, 
               orphanRemoval = true) // Si borras un recurso, borra sus archivos
    @Builder.Default // Necesario para que Builder no deje la lista nula
    private List<FileEntity> archivos = new ArrayList<>();

    /**
     * Método de conveniencia para agregar archivos 
     * asegurando que se mantenga la relación bidireccional.
     */
    public void addArchivo(FileEntity archivo) {
        archivos.add(archivo);
        archivo.setRecurso(this);
    }
}
