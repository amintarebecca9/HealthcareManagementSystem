package com.hms.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.hms")
@EntityScan({"com.hms.model"})
@EnableJpaRepositories({"com.hms.repository"})
public class HealthcareManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthcareManagementSystemApplication.class, args);
	}

}
