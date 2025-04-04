package com.example.LostAndFound.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "claim_id")
    private Long claimId;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "claimer_id", nullable = false)
    private Long claimerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "claim_status", columnDefinition = "ENUM('pending','approved','rejected') DEFAULT 'pending'")
    private ClaimStatus claimStatus = ClaimStatus.pending;

    @Column(name = "claim_date")
    private Timestamp claimDate;

    @Lob
    @Column(name = "claim_image") // LONGBLOB in DB
    private byte[] claimImage;

    @Column(name = "claim_description", columnDefinition = "TEXT")
    private String claimDescription;

    // Getters and Setters
    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getClaimerId() {
        return claimerId;
    }

    public void setClaimerId(Long claimerId) {
        this.claimerId = claimerId;
    }

    public ClaimStatus getClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(ClaimStatus claimStatus) {
        this.claimStatus = claimStatus;
    }

    public Timestamp getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(Timestamp claimDate) {
        this.claimDate = claimDate;
    }

    public byte[] getClaimImage() {
        return claimImage;
    }

    public void setClaimImage(byte[] claimImage) {
        this.claimImage = claimImage;
    }

    public String getClaimDescription() {
        return claimDescription;
    }

    public void setClaimDescription(String claimDescription) {
        this.claimDescription = claimDescription;
    }
}
