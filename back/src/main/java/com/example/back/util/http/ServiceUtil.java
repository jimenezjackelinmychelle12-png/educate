package com.example.back.util.http;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ServiceUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(ServiceUtil.class);

    private final Environment env;
    private String serviceAddress = null;

    public ServiceUtil(Environment env) {
        this.env = env;
    }

    public String getServiceAddress() {
        if (serviceAddress == null) {
            String port = env.getProperty("server.port", "7003"); // valor por defecto
            serviceAddress = findMyHostname() + " / " + findMyIpAddress() + ":" + port;
            LOGGER.info("✅ Service running at: {}", serviceAddress);
        }
        return serviceAddress;
    }

    private String findMyHostname() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            return "unknown-host";
        }
    }

    private String findMyIpAddress() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            return "unknown-ip";
        }
    }
}