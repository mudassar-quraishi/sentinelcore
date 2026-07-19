package backend.reports.repository;

import backend.reports.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@SuppressWarnings("null")
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByOrderByGeneratedTimeDesc();
    List<Report> findByStatus(String status);
}
