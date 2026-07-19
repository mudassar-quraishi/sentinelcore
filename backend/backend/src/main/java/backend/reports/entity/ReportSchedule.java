package backend.reports.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "report_schedules")
public class ReportSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "schedule_name")
    private String scheduleName;

    @Column(nullable = false, name = "cron_expression")
    private String cronExpression;

    @Column(nullable = false, name = "report_type")
    private String reportType;

    @Column(length = 2000)
    private String filters;

    @Column(name = "email_recipients", length = 1000)
    private String emailRecipients;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "last_run_time")
    private LocalDateTime lastRunTime;

    public ReportSchedule() {}

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
