package com.MoviePlay.backendapi.utils;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class ConfigKeepAlive {

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
