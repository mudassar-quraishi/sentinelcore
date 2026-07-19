package backend.reports.dto;

public class ReportStats {

    private Long generatedReportsCount;
    private Long downloadCount;
    private Long storageUsageBytes;

    public ReportStats() {}

    public ReportStats(Long generatedReportsCount, Long downloadCount, Long storageUsageBytes) {
        this.generatedReportsCount = generatedReportsCount;
        this.downloadCount = downloadCount;
        this.storageUsageBytes = storageUsageBytes;
    }

    public Long getGeneratedReportsCount() { return generatedReportsCount; }
    public void setGeneratedReportsCount(Long generatedReportsCount) { this.generatedReportsCount = generatedReportsCount; }

    public Long getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Long downloadCount) { this.downloadCount = downloadCount; }

    public Long getStorageUsageBytes() { return storageUsageBytes; }
    public void setStorageUsageBytes(Long storageUsageBytes) { this.storageUsageBytes = storageUsageBytes; }
}
