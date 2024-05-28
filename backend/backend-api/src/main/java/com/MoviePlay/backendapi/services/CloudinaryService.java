package com.MoviePlay.backendapi.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    @Resource
    private Cloudinary cloudinary;

    public String uploadImageToCloudinary(MultipartFile image, String folderPath, String nameFile) {

        try {
            // Set image upload options
            Map options = ObjectUtils.asMap(
                    "unique_filename", true,
                    "overwrite", true,
                    "public_id", nameFile,
                    "folder", folderPath,
                    "resource_type", "image",
                    "transformation", new Transformation<>()
                            .aspectRatio("1.0").width(450).crop("fill")
            );

            //Upload image to cloudinary with the above options.
            Map uploadedFile = cloudinary.uploader().upload(image.getBytes(), options);

            //Return image link
            return uploadedFile.get("secure_url").toString();

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    };
}
