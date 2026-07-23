package com.smartappointment.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.dto.DashboardDTO;
import com.smartappointment.backend.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardDTO dashboard() {
        return dashboardService.getDashboard();
    }
}