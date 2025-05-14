package com.hms.service;

import com.hms.dto.DashboardResponse;

public interface DashboardService {
    DashboardResponse getDashboardMetrics(Long doctorId);
}