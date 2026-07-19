package backend.reports.controller;

import backend.reports.dto.*;
import backend.reports.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController("enterpriseReportController")
@RequestMapping("/api/reports")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@SuppressWarnings("null")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/generate")
    public ResponseEntity<ReportResponse> generateReport(@RequestBody ReportRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null) ? auth.getName() : "Anonymous";
        ReportResponse response = reportService.generateReport(request, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ReportResponse>> getReportHistory() {
        return ResponseEntity.ok(reportService.getReportHistory());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long id) {
        byte[] pdfData = reportService.downloadReportFile(id);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "report_" + id + ".pdf");
        
        return ResponseEntity.ok()
            .headers(headers)
            .body(pdfData);
    }

    @PostMapping("/{id}/email")
    public ResponseEntity<Map<String, String>> emailReport(@PathVariable Long id, @RequestBody Map<String, String> emailRequest) {
        String email = emailRequest.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Recipient email is required"));
        }
        reportService.emailReport(id, email);
        return ResponseEntity.ok(Map.of("message", "Email sent successfully"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ReportStats> getDashboardStats() {
        return ResponseEntity.ok(reportService.getDashboardStats());
    }

    // Schedules
    @GetMapping("/schedules")
    public ResponseEntity<List<ReportScheduleResponse>> getSchedules() {
        return ResponseEntity.ok(reportService.getSchedules());
    }

    @PostMapping("/schedules")
    public ResponseEntity<ReportScheduleResponse> createSchedule(@RequestBody ReportScheduleRequest request) {
        return ResponseEntity.ok(reportService.createSchedule(request));
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Map<String, String>> deleteSchedule(@PathVariable Long id) {
        reportService.deleteSchedule(id);
        return ResponseEntity.ok(Map.of("message", "Schedule deleted successfully"));
    }
}
