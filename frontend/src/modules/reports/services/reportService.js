import api from "../../../services/api";

const reportService = {
  getStats: () => api.get("/reports/dashboard"),
  getHistory: () => api.get("/reports/history"),
  generate: (data) => api.post("/reports/generate", data),
  email: (id, email) => api.post(`/reports/${id}/email`, { email }),
  
  // Downloading file as blob
  download: async (id) => {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Schedules
  getSchedules: () => api.get("/reports/schedules"),
  createSchedule: (data) => api.post("/reports/schedules", data),
  deleteSchedule: (id) => api.delete(`/reports/schedules/${id}`),
};

export default reportService;
