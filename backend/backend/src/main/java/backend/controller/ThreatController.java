package backend.controller;

import backend.entity.Threat;
import backend.service.ThreatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/threats")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class ThreatController {

    @Autowired
    private ThreatService threatService;

    // Get all threats
    @GetMapping
    public List<Threat> getAllThreats() {
        return threatService.getAllThreats();
    }

    // Add a new threat
    @PostMapping
    public Threat addThreat(@RequestBody Threat threat) {
        return threatService.saveThreat(threat);
    }

    // Delete a threat
    @DeleteMapping("/{id}")
    public String deleteThreat(@PathVariable Long id) {
        threatService.deleteThreat(id);
        return "Threat Deleted Successfully";
    }

    @GetMapping("/{id}")
    public Threat getThreatById(@PathVariable Long id) {

        return threatService.getThreatById(id);

    }


    @PutMapping("/{id}")
    public Threat updateThreat(@PathVariable Long id, @RequestBody Threat threat) {

        return threatService.updateThreat(id, threat);

    }
}