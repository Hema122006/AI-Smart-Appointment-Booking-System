package com.smartappointment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.dto.ReportDTO;
import com.smartappointment.backend.entity.AppointmentStatus;
import com.smartappointment.backend.entity.UserRole;
import com.smartappointment.backend.repository.AppointmentRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.repository.UserRepository;

@Service
public class ReportService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DoctorRepository doctorRepository;

    public ReportDTO getReport() {

        ReportDTO dto = new ReportDTO();

        dto.setTotalAppointments(
                appointmentRepository.count());

        dto.setCompletedAppointments(
                appointmentRepository.countByStatus(AppointmentStatus.COMPLETED));

        dto.setCancelledAppointments(
                appointmentRepository.countByStatus(AppointmentStatus.CANCELLED));

        dto.setPendingAppointments(
                appointmentRepository.countByStatus(AppointmentStatus.PENDING));

        dto.setConfirmedAppointments(
                appointmentRepository.countByStatus(AppointmentStatus.CONFIRMED)
        );

        dto.setTotalPatients(
                userRepository.findByRole(UserRole.PATIENT).size());

        dto.setTotalDoctors(
                doctorRepository.count());

        dto.setTotalRevenue(
                appointmentRepository.getTotalRevenue());

        return dto;

    }

}