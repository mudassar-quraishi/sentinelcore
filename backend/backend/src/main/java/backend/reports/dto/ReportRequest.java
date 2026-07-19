package backend.reports.dto;

import java.time.LocalDateTime;

public class ReportRequest {

    private String reportType;
    private String name;
    
    // Filters
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String severity;
    private String analyst;
    private String incidentType;
    private String status;
    private String department;

    // PDF Settings
    private String watermarkText;
    private String password;
    private Boolean includeLogo = true;
    private Boolean includeSignaturePlaceholder = true;
    private Boolean includeQrCode = true;

    public ReportRequest() {}

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getAnalyst() { return analyst; }
    public void setAnalyst(String analyst) { this.analyst = analyst; }

    public String getIncidentType() { return incidentType; }
    public void setIncidentType(String incidentType) { this.incidentType = incidentType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getWatermarkText() { return watermarkText; }
    public void setWatermarkText(String watermarkText) { this.watermarkText = watermarkText; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Boolean getIncludeLogo() { return includeLogo; }
    public void setIncludeLogo(Boolean includeLogo) { this.includeLogo = includeLogo; }

    public Boolean getIncludeSignaturePlaceholder() { return includeSignaturePlaceholder; }
    public void setIncludeSignaturePlaceholder(Boolean includeSignaturePlaceholder) { this.includeSignaturePlaceholder = includeSignaturePlaceholder; }

    public Boolean getIncludeQrCode() { return includeQrCode; }
    public void setIncludeQrCode(Boolean includeQrCode) { this.includeQrCode = includeQrCode; }
}
