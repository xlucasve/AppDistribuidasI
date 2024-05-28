package com.MoviePlay.backendapi.services;

import com.MoviePlay.backendapi.entities.Image;
import com.MoviePlay.backendapi.repositories.ImageRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {


    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;

    public ImageService(CloudinaryService cloudinaryService, ImageRepository imageRepository) {
        this.cloudinaryService = cloudinaryService;
        this.imageRepository = imageRepository;
    }



    public ResponseEntity<Map> uploadImage(MultipartFile request) {
        try {

            String imageUrl = cloudinaryService.uploadImageToCloudinary(request, "profiles_images/doctor", "image");

            //TODO: Store new image link in user object
            return ResponseEntity.ok().body(Map.of("url", imageUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }


}
