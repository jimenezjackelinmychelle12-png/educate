package com.example.back.otp;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "*") // permite llamadas desde React (ajustar según seguridad)
public class OtpController {

    @Autowired
    private OtpCodeRepository otpCodeRepository;

    // Endpoint para guardar OTP
    @PostMapping("/save")
    public ResponseEntity<String> saveOtp(@RequestBody OtpRequest request) {
        OtpCode otp = new OtpCode(request.getEmail(), request.getCode(), LocalDateTime.now());
        otpCodeRepository.save(otp);
        return ResponseEntity.ok("OTP guardado");
    }

    // DTO para recibir JSON
    public static class OtpRequest {
        private String email;
        private String code;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }
}