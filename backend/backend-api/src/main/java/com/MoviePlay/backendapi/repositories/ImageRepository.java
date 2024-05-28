package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
