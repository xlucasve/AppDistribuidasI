package com.MoviePlay.backendapi.repositories;

import com.MoviePlay.backendapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
