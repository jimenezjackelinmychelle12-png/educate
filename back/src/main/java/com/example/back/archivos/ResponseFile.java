package com.example.back.archivos;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class ResponseFile {
    private UUID id;
    private String name;
    private String url;
    private String type;
    private long size;
}