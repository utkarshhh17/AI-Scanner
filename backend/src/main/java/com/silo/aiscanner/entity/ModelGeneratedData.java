package com.silo.aiscanner.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "model_generated_data")
public class ModelGeneratedData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_media_id")
    private Long userMediaDetailsId;

    @Column(name = "model_response", columnDefinition = "TEXT")
    private String json;

    @Column(name = "model_json_s3_path")
    private String modelJsonS3Path;

    @Column(name = "pdf_s3_url")
    private String pdfS3Url;

    @Column(name = "is_viewed")
    private int isViewed;

    @Column(name = "is_downloaded")
    private int isDownloaded;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    public ModelGeneratedData() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getUserMediaDetailsId() {
        return userMediaDetailsId;
    }

    public void setUserMediaDetailsId(Long userMediaDetailsId) {
        this.userMediaDetailsId = userMediaDetailsId;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getModelJsonS3Path() {
        return modelJsonS3Path;
    }

    public void setModelJsonS3Path(String modelJsonS3Path) {
        this.modelJsonS3Path = modelJsonS3Path;
    }

    public String getPdfS3Url() {
        return pdfS3Url;
    }

    public void setPdfS3Url(String pdfS3Url) {
        this.pdfS3Url = pdfS3Url;
    }

    public int getIsViewed() {
        return isViewed;
    }

    public void setIsViewed(int isViewed) {
        this.isViewed = isViewed;
    }

    public int getIsDownloaded() {
        return isDownloaded;
    }

    public void setIsDownloaded(int isDownloaded) {
        this.isDownloaded = isDownloaded;
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
