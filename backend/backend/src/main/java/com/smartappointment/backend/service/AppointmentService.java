package com.smartappointment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.dto.AppointmentRequest;
import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.AppointmentStatus;
import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.repository.AppointmentRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.repository.UserRepository;
import com.smartappointment.backend.entity.Payment;
import com.smartappointment.backend.repository.PaymentRepository;

@Service
public class AppointmentService {
    
    @Autowired
private WhatsappService whatsappService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SmsService smsService;

    @Autowired
    private PaymentRepository paymentRepository;

    public Appointment bookAppointment(AppointmentRequest request) {

        System.out.println("Patient ID = " + request.getPatientId());
        System.out.println("Doctor ID = " + request.getDoctorId());
        System.out.println("Date = " + request.getAppointmentDate());
        System.out.println("Time = " + request.getAppointmentTime());

        // Find patient
        User patient = userRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Find doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

                if (!doctor.isAvailable()) {
                    throw new RuntimeException("Doctor is currently unavailable.");
       
       }

       boolean booked = appointmentRepository
        .existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                doctor.getId(),
                request.getAppointmentDate(),
                request.getAppointmentTime()
        );

          if (booked) {
              throw new RuntimeException(
                   "This time slot is already booked. Please choose another time."
           );
         }

        // Create appointment
        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());

        appointment.setEmergency(request.isEmergency());
        if(request.isEmergency()){
    appointment.setStatus(AppointmentStatus.PENDING);
}
else{
    appointment.setStatus(AppointmentStatus.PENDING);
}
        appointment.setFirstTimePatient(request.isFirstTimePatient());

        // Payment Logic
        if (request.isFirstTimePatient()) {
            appointment.setPaymentAmount(200);
            appointment.setPaymentCompleted(false);
            appointment.setStatus(AppointmentStatus.PENDING);
        } else {
            appointment.setPaymentAmount(0);
            appointment.setPaymentCompleted(true);
            appointment.setStatus(AppointmentStatus.CONFIRMED);
        }

        // Save Appointment
        Appointment savedAppointment = appointmentRepository.save(appointment);
        Payment payment = new Payment();

payment.setAppointment(savedAppointment);
payment.setAmount(savedAppointment.getPaymentAmount());
payment.setPaymentMethod("ONLINE");
payment.setPaymentStatus("PENDING");

paymentRepository.save(payment);

        // SMS / WhatsApp Message
        String sms =
                "🏥 Smart Appointment System\n\n" +
                "✅ Appointment Confirmed\n\n" +
                "👨‍⚕️ Doctor:" + doctor.getName() +
                "\n📅 Date: " + request.getAppointmentDate() +
                "\n🕒 Time: " + request.getAppointmentTime() +
                "\n\nPlease arrive 10 minutes early.\n\nThank you!";

        System.out.println("Patient ID : " + patient.getId());
        System.out.println("Patient Name : " + patient.getName());
        System.out.println("Patient Mobile : " + patient.getMobileNumber());

        try{

    smsService.sendSMS(patient.getMobileNumber(), sms);
    smsService.sendWhatsApp(patient.getMobileNumber(), sms);
    whatsappService.sendWhatsApp(
            patient.getMobileNumber(),
            sms);

}
catch(Exception e){

    System.out.println(e.getMessage());

}

        return savedAppointment;
    }

    // ============================
// ADMIN - GET ALL APPOINTMENTS
// ============================
public List<Appointment> getAllAppointments() {
return appointmentRepository
            .findAllByOrderByEmergencyDescAppointmentDateAscAppointmentTimeAsc();

}

    public List<Appointment> searchAppointments(String keyword) {

        List<Appointment> patients =
                appointmentRepository.findByPatient_NameContainingIgnoreCase(keyword);

        if (!patients.isEmpty()) {
            return patients;
        }

        return appointmentRepository.findByDoctor_NameContainingIgnoreCase(keyword);
    }


    public Appointment completeAppointment(Long id) {

    Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setStatus(AppointmentStatus.COMPLETED);

    appointment.setPaymentCompleted(true);

    return appointmentRepository.save(appointment);
}

public Appointment cancelAppointment(Long id) {

    Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    System.out.println("Cancelling Appointment : " + appointment.getId());

    appointment.setStatus(AppointmentStatus.CANCELLED);

    return appointmentRepository.save(appointment);
}

public Appointment confirmAppointment(Long id) {

    Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setStatus(AppointmentStatus.CONFIRMED);

    return appointmentRepository.save(appointment);

}

// ============================
// PATIENT APPOINTMENT HISTORY
// ============================
public List<Appointment> getAppointments(Long patientId) {

    return appointmentRepository.findByPatientId(patientId);

}
public void deleteAppointment(Long id) {

    Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    Payment payment = paymentRepository.findByAppointmentId(id)
        .orElse(null);

    if (payment != null) {
        paymentRepository.delete(payment);
    }

    appointmentRepository.delete(appointment);
}
public List<Appointment> getDoctorAppointments(Long doctorId)
{

    return appointmentRepository.findByDoctorId(doctorId);

}
}
