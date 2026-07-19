package backend.reports.dto;

import java.time.LocalDateTime;

public class ReportScheduleResponse {

    private Long id;
    private String scheduleName;
    private String cronExpression;
    private String reportType;
    private String filters;
    private String emailRecipients;
    private Boolean active;
    private LocalDateTime lastRunTime;

    public ReportScheduleResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getScheduleName() { return scheduleName; }
    public void setScheduleName(String scheduleName) { this.scheduleName = scheduleName; }

    public String getCronExpression() { return cronExpression; }
    public void setCronExpression(String cronExpression) { this.cronExpression = cronExpression; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getFilters() { return filters; }
    public void setFilters(String filters) { this.filters = filters; }

    public String getEmailRecipients() { return emailRecipients; }
    public void setEmailRecipients(String emailRecipients) { this.emailRecipients = emailRecipients; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getLastRunTime() { return lastRunTime; }
    public void setLastRunTime(LocalDateTime lastRunTime) { this.lastRunTime = lastRunTime; }
}
