package com.example.back.otp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:3000")
public class OtpController {

    @Autowired
    private OtpService otpService;

    // ✅ Enviar OTP (guardar)
    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {

        otpService.saveOtp(request.getEmail(), request.getCode());

        return ResponseEntity.ok("OTP enviado y guardado");
    }

    // ✅ Verificar OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest request) {

        String result = otpService.verifyOtp(
                request.getEmail(),
                request.getCode()
        );

        if (result.equals("OTP válido")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // DTO
    public static class OtpRequest {
        private String email;
        private String code;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }
}