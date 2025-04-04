
package com.example.LostAndFound.service;

import java.io.IOException;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.LostAndFound.entity.Claim;
import com.example.LostAndFound.entity.ClaimStatus;
import com.example.LostAndFound.repository.ClaimRepository;

@Service
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;

    public Claim createClaim(Long itemId, Long claimerId, String description, MultipartFile imageFile) throws IOException {
        Claim claim = new Claim();
        claim.setItemId(itemId);
        claim.setClaimerId(claimerId);
        claim.setClaimStatus(ClaimStatus.pending);
        claim.setClaimDate(new Timestamp(System.currentTimeMillis()));
        claim.setClaimDescription(description);
        if (imageFile != null && !imageFile.isEmpty()) {
            claim.setClaimImage(imageFile.getBytes());
        }
        return claimRepository.save(claim);
    }
    
}
