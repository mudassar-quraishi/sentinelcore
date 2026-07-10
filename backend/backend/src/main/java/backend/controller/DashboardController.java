package backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class DashboardController {

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("threats", 125);
        stats.put("alerts", 18);
        stats.put("ioc", 432);
        stats.put("risk", "82%");

        return stats;
    }

    @GetMapping("/chart")
    public List<Map<String, Object>> getChartData() {

        List<Map<String, Object>> chart = new ArrayList<>();

        chart.add(Map.of("day", "Mon", "threats", 12));
        chart.add(Map.of("day", "Tue", "threats", 18));
        chart.add(Map.of("day", "Wed", "threats", 25));
        chart.add(Map.of("day", "Thu", "threats", 30));
        chart.add(Map.of("day", "Fri", "threats", 45));
        chart.add(Map.of("day", "Sat", "threats", 38));
        chart.add(Map.of("day", "Sun", "threats", 50));

        return chart;
    }
}