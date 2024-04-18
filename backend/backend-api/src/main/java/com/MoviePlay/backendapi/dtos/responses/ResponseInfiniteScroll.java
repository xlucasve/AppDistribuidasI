package com.MoviePlay.backendapi.dtos.responses;

import java.util.List;

public record ResponseInfiniteScroll(List<ResponseMovieInScroll> movies) {
}
