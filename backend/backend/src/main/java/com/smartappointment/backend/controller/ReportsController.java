package com.smartappointment.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.dto.ReportDTO;
import com.smartappointment.backend.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportsController {

    @Autowired
    ReportService reportService;

    @GetMapping
    public ReportDTO getReport() {
        return reportService.getReport();
    }

}