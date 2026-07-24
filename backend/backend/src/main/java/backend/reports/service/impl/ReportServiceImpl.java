package backend.reports.service.impl;

import backend.entity.*;
import backend.repository.*;
import backend.reports.dto.*;
import backend.reports.entity.Report;
import backend.reports.entity.ReportSchedule;
import backend.reports.repository.ReportRepository;
import backend.reports.repository.ReportScheduleRepository;
import backend.reports.service.ReportService;
import backend.reports.util.EmailUtil;
import backend.reports.util.PdfGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ReportScheduleRepository reportScheduleRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private ThreatRepository threatRepository;

    @Autowired
    private VulnerabilityRepository vulnerabilityRepository;

    @Autowired
    private EmailUtil emailUtil;

    private final ExecutorService executorService = Executors.newFixedThreadPool(4);

    private static final String STORAGE_DIR = "reports_storage";

    // Seeder compliance items for Mock Compliance reporting
    private static final List<Map<String, String>> COMPLIANCE_ITEMS = Arrays.asList(
        Map.of("id", "ISO-27001.5.1", "standard", "ISO 27001", "name", "Information security policies", "status", "COMPLIANT"),
        Map.of("id", "ISO-27001.6.1", "standard", "ISO 27001", "name", "Internal organization", "status", "COMPLIANT"),
        Map.of("id", "ISO-27001.9.1", "standard", "ISO 27001", "name", "Access control policy", "status", "PARTIALLY_COMPLIANT"),
        Map.of("id", "SOC2-CC-6.1", "standard", "SOC 2 Type II", "name", "Logical access controls", "status", "COMPLIANT"),
        Map.of("id", "SOC2-CC-7.2", "standard", "SOC 2 Type II", "name", "Vulnerability management", "status", "PARTIALLY_COMPLIANT"),
        Map.of("id", "PCI-DSS-1.1", "standard", "PCI-DSS v4.0", "name", "Firewall configurations", "status", "COMPLIANT"),
        Map.of("id", "PCI-DSS-3.2", "standard", "PCI-DSS v4.0", "name", "Protection of cardholder data", "status", "NOT_APPLICABLE")
    );

    @Override
    @Transactional
    public ReportResponse generateReport(ReportRequest request, String username) {
        Report report = new Report();
        report.setName(request.getName() != null ? request.getName() : request.getReportType() + " Report");
        report.setReportType(request.getReportType());
        report.setStatus("PENDING");
        report.setGeneratedBy(username);
        report.setGeneratedTime(LocalDateTime.now());
        
        // Save filter details as string
        String filterDesc = String.format("Severity: %s, Status: %s, Type: %s", 
            request.getSeverity(), request.getStatus(), request.getIncidentType());
        report.setFilters(filterDesc);

        Report savedReport = reportRepository.save(report);

        // Async compilation in the worker queue
        executorService.submit(() -> generatePdfAsync(savedReport.getId(), request, username));

        return mapToResponse(savedReport);
    }

    private void generatePdfAsync(Long reportId, ReportRequest request, String username) {
        try {
            Report report = reportRepository.findById(reportId).orElseThrow();
            report.setStatus("IN_PROGRESS");
            reportRepository.save(report);

            // 1. Gather Data based on filters
            List<Map<String, Object>> records = new ArrayList<>();
            Map<String, Object> stats = new LinkedHashMap<>();

            if (request.getReportType().equalsIgnoreCase("incident")) {
                List<Incident> incidents = incidentRepository.findAll();
                
                // Apply filters
                List<Incident> filtered = incidents.stream()
                    .filter(i -> request.getSeverity() == null || request.getSeverity().isEmpty() || i.getSeverity().equalsIgnoreCase(request.getSeverity()))
                    .filter(i -> request.getStatus() == null || request.getStatus().isEmpty() || i.getStatus().equalsIgnoreCase(request.getStatus()))
                    .filter(i -> request.getStartDate() == null || i.getCreatedAt().isAfter(request.getStartDate()))
                    .filter(i -> request.getEndDate() == null || i.getCreatedAt().isBefore(request.getEndDate()))
                    .collect(Collectors.toList());

                for (Incident i : filtered) {
                    records.add(Map.of(
                        "id", i.getId(),
                        "title", i.getTitle(),
                        "severity", i.getSeverity(),
                        "status", i.getStatus(),
                        "createdAt", i.getCreatedAt().toString()
                    ));
                }

                stats.put("Total Incidents", filtered.size());
                stats.put("Open", filtered.stream().filter(i -> i.getStatus().equalsIgnoreCase("Open")).count());
                stats.put("Critical/High", filtered.stream().filter(i -> i.getSeverity().equalsIgnoreCase("Critical") || i.getSeverity().equalsIgnoreCase("High")).count());

            } else if (request.getReportType().equalsIgnoreCase("alert")) {
                List<Alert> alerts = alertRepository.findAll();
                
                List<Alert> filtered = alerts.stream()
                    .filter(a -> request.getSeverity() == null || request.getSeverity().isEmpty() || a.getSeverity().equalsIgnoreCase(request.getSeverity()))
                    .filter(a -> request.getStatus() == null || request.getStatus().isEmpty() || a.getStatus().equalsIgnoreCase(request.getStatus()))
                    .collect(Collectors.toList());

                for (Alert a : filtered) {
                    records.add(Map.of(
                        "id", a.getId(),
                        "title", a.getTitle(),
                        "severity", a.getSeverity(),
                        "status", a.getStatus()
                    ));
                }

                stats.put("Total Alerts", filtered.size());
                stats.put("High Severity", filtered.stream().filter(a -> a.getSeverity().equalsIgnoreCase("High")).count());

            } else if (request.getReportType().equalsIgnoreCase("compliance")) {
                // Return mock compliance data filtered by standard/status if matching
                List<Map<String, String>> filtered = COMPLIANCE_ITEMS.stream()
                    .filter(c -> request.getStatus() == null || request.getStatus().isEmpty() || c.get("status").equalsIgnoreCase(request.getStatus()))
                    .collect(Collectors.toList());

                for (Map<String, String> c : filtered) {
                    records.add(Map.of(
                        "id", c.get("id"),
                        "standard", c.get("standard"),
                        "name", c.get("name"),
                        "status", c.get("status")
                    ));
                }

                stats.put("Checked Controls", filtered.size());
                stats.put("Compliant", filtered.stream().filter(c -> c.get("status").equals("COMPLIANT")).count());

            } else if (request.getReportType().equalsIgnoreCase("dashboard")) {
                // Dashboard summary brings in multiple counts
                stats.put("Total Incidents", incidentRepository.count());
                stats.put("Total Threats", threatRepository.count());
                stats.put("Total Alerts", alertRepository.count());
                stats.put("Total Vulnerabilities", vulnerabilityRepository.count());

                // Mock Audit Log for records
                List<AuditLog> audits = auditLogRepository.findAll();
                for (AuditLog a : audits) {
                    records.add(Map.of(
                        "timestamp", a.getTimestamp() != null ? a.getTimestamp().toString() : LocalDateTime.now().toString(),
                        "user", a.getUser() != null ? a.getUser().getName() : "System",
                        "action", a.getAction(),
                        "details", a.getDescription() != null ? a.getDescription() : ""
                    ));
                }
            } else { // audit logs
                List<AuditLog> audits = auditLogRepository.findAll();
                
                List<AuditLog> filtered = audits.stream()
                    .filter(a -> request.getStartDate() == null || a.getTimestamp().isAfter(request.getStartDate()))
                    .filter(a -> request.getEndDate() == null || a.getTimestamp().isBefore(request.getEndDate()))
                    .collect(Collectors.toList());

                for (AuditLog a : filtered) {
                    records.add(Map.of(
                        "timestamp", a.getTimestamp() != null ? a.getTimestamp().toString() : "",
                        "user", a.getUser() != null ? a.getUser().getName() : "System",
                        "action", a.getAction(),
                        "details", a.getDescription() != null ? a.getDescription() : ""
                    ));
                }

                stats.put("Total Audit Logs", filtered.size());
            }

            // 2. Generate PDF using utility
            byte[] pdfBytes = PdfGeneratorUtil.generateReportPdf(request, records, stats, username);

            // 3. Store PDF
            File storageDir = new File(STORAGE_DIR);
            if (!storageDir.exists()) {
                storageDir.mkdirs();
            }

            String fileName = request.getReportType() + "_" + reportId + "_" + System.currentTimeMillis() + ".pdf";
            File pdfFile = new File(storageDir, fileName);
            
            try (FileOutputStream fos = new FileOutputStream(pdfFile)) {
                fos.write(pdfBytes);
            }

            // 4. Update Report Info
            report.setStatus("COMPLETED");
            report.setStoragePath(pdfFile.getAbsolutePath());
            report.setFileSize((long) pdfBytes.length);
            reportRepository.save(report);

        } catch (Exception e) {
            Report report = reportRepository.findById(reportId).orElse(null);
            if (report != null) {
                report.setStatus("FAILED");
                report.setErrorMessage(e.getMessage());
                reportRepository.save(report);
            }
            e.printStackTrace();
        }
    }

    @Override
    public List<ReportResponse> getReportHistory() {
        return reportRepository.findAllByOrderByGeneratedTimeDesc().stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    @Override
    public byte[] downloadReportFile(Long reportId) {
        Report report = reportRepository.findById(reportId)
            .orElseThrow(() -> new RuntimeException("Report not found"));

        if (!"COMPLETED".equals(report.getStatus())) {
            throw new RuntimeException("Report is not ready for download");
        }

        try {
            File file = new File(report.getStoragePath());
            byte[] bytes = java.nio.file.Files.readAllBytes(file.toPath());
            
            // Increment download count
            report.setDownloadCount(report.getDownloadCount() + 1);
            reportRepository.save(report);
            
            return bytes;
        } catch (Exception e) {
            throw new RuntimeException("Error reading report file: " + e.getMessage());
        }
    }

    @Override
    public void emailReport(Long reportId, String recipientEmail) {
        Report report = reportRepository.findById(reportId)
            .orElseThrow(() -> new RuntimeException("Report not found"));

        if (!"COMPLETED".equals(report.getStatus())) {
            throw new RuntimeException("Report is not ready for emailing");
        }

        String subject = "SentinelCore Security Report: " + report.getName();
        String body = "Hello,\n\nPlease find attached the requested SentinelCore security report: " 
            + report.getName() + ".\n\nGenerated at: " + report.getGeneratedTime() + "\nGenerated by: " 
            + report.getGeneratedBy() + "\n\nBest regards,\nSentinelCore Security Team";

        emailUtil.sendReportEmail(recipientEmail, subject, body, report.getStoragePath());
    }

    @Override
    public ReportStats getDashboardStats() {
        long count = reportRepository.count();
        long downloads = reportRepository.findAll().stream().mapToLong(Report::getDownloadCount).sum();
        long storageBytes = reportRepository.findAll().stream().mapToLong(Report::getFileSize).sum();
        return new ReportStats(count, downloads, storageBytes);
    }

    // Scheduled Reports implementations
    @Override
    public List<ReportScheduleResponse> getSchedules() {
        return reportScheduleRepository.findAll().stream()
            .map(this::mapToScheduleResponse)
            .collect(Collectors.toList());
    }

    @Override
    public ReportScheduleResponse createSchedule(ReportScheduleRequest request) {
        ReportSchedule schedule = new ReportSchedule();
        schedule.setScheduleName(request.getScheduleName());
        schedule.setCronExpression(request.getCronExpression());
        schedule.setReportType(request.getReportType());
        schedule.setFilters(request.getFilters());
        schedule.setEmailRecipients(request.getEmailRecipients());
        schedule.setActive(request.getActive() != null ? request.getActive() : true);
        
        ReportSchedule saved = reportScheduleRepository.save(schedule);
        return mapToScheduleResponse(saved);
    }

    @Override
    public void deleteSchedule(Long scheduleId) {
        reportScheduleRepository.deleteById(scheduleId);
    }

    // Helper Mappers
    private ReportResponse mapToResponse(Report report) {
        ReportResponse res = new ReportResponse();
        res.setId(report.getId());
        res.setName(report.getName());
        res.setReportType(report.getReportType());
        res.setStatus(report.getStatus());
        res.setFilters(report.getFilters());
        res.setGeneratedBy(report.getGeneratedBy());
        res.setGeneratedTime(report.getGeneratedTime());
        res.setDownloadCount(report.getDownloadCount());
        res.setFileSize(report.getFileSize());
        res.setErrorMessage(report.getErrorMessage());
        return res;
    }

    private ReportScheduleResponse mapToScheduleResponse(ReportSchedule schedule) {
        ReportScheduleResponse res = new ReportScheduleResponse();
        res.setId(schedule.getId());
        res.setScheduleName(schedule.getScheduleName());
        res.setCronExpression(schedule.getCronExpression());
        res.setReportType(schedule.getReportType());
        res.setFilters(schedule.getFilters());
        res.setEmailRecipients(schedule.getEmailRecipients());
        res.setActive(schedule.getActive());
        res.setLastRunTime(schedule.getLastRunTime());
        return res;
    }
}
