import jsPDF from "jspdf";

export const downloadReceipt = (
  patientName: string,
  doctorName: string,
  specialization: string,
  appointmentDate: string,
  appointmentTime: string,
  amount: number
) => {

  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text("SMART APPOINTMENT SYSTEM", 20, 20);

  pdf.setFontSize(14);
  pdf.text("Appointment Payment Receipt", 20, 32);

  pdf.line(20, 36, 190, 36);

  pdf.setFontSize(12);

  pdf.text(`Patient : ${patientName}`,20,50);

  pdf.text(`Doctor : ${doctorName}`,20,60);

  pdf.text(`Department : ${specialization}`,20,70);

  pdf.text(`Appointment Date : ${appointmentDate}`,20,80);

  pdf.text(`Appointment Time : ${appointmentTime}`,20,90);

  pdf.text(`Amount Paid : ₹${amount}`,20,100);

  pdf.text("Payment Status : PAID",20,110);

  pdf.text(`Receipt Generated : ${new Date().toLocaleString()}`,20,125);

  pdf.line(20,135,190,135);

  pdf.setFontSize(15);
  pdf.text("Thank You!",80,150);

  pdf.save("AppointmentReceipt.pdf");
};