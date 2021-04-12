package com.dp.server.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.dp"})
public class DiscussionportalApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiscussionportalApplication.class, args);
	}

}
