package com.example.back.otp;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    @Autowired
    private OtpCodeRepository repository;

    // ✅ Guardar OTP
    public void saveOtp(String email, String code) {

        OtpCode otp = new OtpCode(
                email,
                code,
                LocalDateTime.now()
        );

        repository.save(otp);
    }

    // ✅ Verificar OTP (simple)
    public String verifyOtp(String email, String code) {

        Optional<OtpCode> optionalOtp =
                repository.findTopByEmailOrderByCreatedAtDesc(email);

        if (optionalOtp.isEmpty()) {
            return "OTP no encontrado";
        }

        OtpCode otp = optionalOtp.get();

        if (otp.getCode().equals(code)) {
            return "OTP válido";
        } else {
            return "OTP incorrecto";
        }
    }
}