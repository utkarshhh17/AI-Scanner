package com.silo.aiscanner.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "media_details")
public class MediaDetails {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mediaDetailsId;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "video_file", nullable = true)
    private String videoFile;

    @Column(name = "video_s3_path", nullable = true)
    private String videoS3Path;

    @Column(name = "image_files")
    private String imageFile;

    @Column(name = "images_s3_path")
    private String imageS3Path;

    @Column(name = "promocode", nullable = true)
    private String promocode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public long getMediaDetailsId() {
        return mediaDetailsId;
    }

    public void setMediaDetailsId(long mediaDetailsId) {
        this.mediaDetailsId = mediaDetailsId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getVideoFile() {
        return videoFile;
    }

    public void setVideoFile(String videoFile) {
        this.videoFile = videoFile;
    }

    public String getVideoS3Path() {
        return videoS3Path;
    }

    public void setVideoS3Path(String videoS3Path) {
        this.videoS3Path = videoS3Path;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getImageS3Path() {
        return imageS3Path;
    }

    public void setImageS3Path(String imageS3Path) {
        this.imageS3Path = imageS3Path;
    }

    public String getPromocode() {
        return promocode;
    }

    public void setPromocode(String promocode) {
        this.promocode = promocode;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
