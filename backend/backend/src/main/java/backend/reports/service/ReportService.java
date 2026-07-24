package backend.reports.service;

import backend.reports.dto.*;
import java.util.List;

public interface ReportService {
    ReportResponse generateReport(ReportRequest request, String username);
    List<ReportResponse> getReportHistory();
    byte[] downloadReportFile(Long reportId);
    void emailReport(Long reportId, String recipientEmail);
    ReportStats getDashboardStats();
    
    // Schedules
    List<ReportScheduleResponse> getSchedules();
    ReportScheduleResponse createSchedule(ReportScheduleRequest request);
    void deleteSchedule(Long scheduleId);
}
