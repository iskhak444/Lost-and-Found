package com.example.LostAndFound.controller;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.LostAndFound.service.ClaimService;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {
    
    @Autowired
    private ClaimService claimService;

    @PostMapping("/{id}/claim")
    public ResponseEntity<String> createClaim(
            @RequestParam("itemId") Long itemId,
            @RequestParam("claimerId") Long claimerId,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            claimService.createClaim(itemId, claimerId, description, imageFile);
            return ResponseEntity.ok("Claim submitted successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to create claim: " + e.getMessage());
        }
    }

    // Additional endpoints for approvals, rejections, retrieving claims, etc.:
    // @GetMapping("/{claimId}") ...
    // @PutMapping("/{claimId}/approve") ...
}
