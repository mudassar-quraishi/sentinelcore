package backend.service;

import backend.entity.Threat;
import backend.repository.ThreatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@SuppressWarnings("null")
public class ThreatService {

    @Autowired
    private ThreatRepository threatRepository;

    // Get all threats
    public List<Threat> getAllThreats() {
        return threatRepository.findAll();
    }

    // Get threat by ID
    public Threat getThreatById(Long id) {
        return threatRepository.findById(id).orElse(null);
    }

    // Add new threat
    public Threat saveThreat(Threat threat) {
        return threatRepository.save(threat);
    }

    // Update existing threat
    public Threat updateThreat(Long id, Threat updatedThreat) {

        Threat existingThreat = threatRepository.findById(id).orElse(null);

        if (existingThreat == null) {
            return null;
        }

        existingThreat.setTitle(updatedThreat.getTitle());
        existingThreat.setSeverity(updatedThreat.getSeverity());
        existingThreat.setSource(updatedThreat.getSource());
        existingThreat.setStatus(updatedThreat.getStatus());

        return threatRepository.save(existingThreat);
    }

    // Delete threat
    public void deleteThreat(Long id) {
        threatRepository.deleteById(id);
    }
}