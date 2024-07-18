package com.MoviePlay.backendapi.dtos.responses;

import com.MoviePlay.backendapi.entities.enums.HealthStatus;

public record ResponseHealthCheck(HealthStatus isAppWorking, HealthStatus isDatabaseWorking) {
}
