package com.MoviePlay.backendapi;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class BackendApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApiApplication.class, args);
	}

	@Scheduled(fixedDelay = 1000*60)
	public void keepAlive(){
		try {
			Unirest.setTimeouts(0, 0);
			HttpResponse<String> response = Unirest.get("https://keepalive-h1q1.onrender.com/api/")
					.asString();
			System.out.println("KEEP ALIVE RESPONSE: " + response.getBody());
			System.out.println("Called");
		} catch (Exception e) {
			System.out.println("ERROR CALLIN KEEP ALIVE: " + e.getMessage());
		}
	}
}
