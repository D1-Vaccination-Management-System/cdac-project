import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaStamp } from "react-icons/fa";

const VaccinationCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = "http://localhost:9999";

  // Retrieve patient details from session storage
  const patientDetails = {
    firstName: sessionStorage.getItem("patientFirstName"),
    lastName: sessionStorage.getItem("patientLastName"),
    email: sessionStorage.getItem("patientEmail"),
    phone: sessionStorage.getItem("patientPhone"),
    address: {
      street: sessionStorage.getItem("street"),
      city: sessionStorage.getItem("city"),
      state: sessionStorage.getItem("state"),
      zipCode: sessionStorage.getItem("zipCode"),
    },
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      const patientId = sessionStorage.getItem("patientId");

      if (!patientId) {
        setError("Patient ID not found in session storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/patient/get-patient-appointment-history`,
          {
            params: { patientId },
          }
        );
        // Filter for completed appointments
        const completedAppointments = response.data.filter(
          (appointment) => appointment.appointmentStatus === "COMPLETED"
        );
        setCertificates(completedAppointments);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const downloadCertificatePDF = async (certificateId) => {
    const element = document.getElementById(`certificate-${certificateId}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: null, // Avoid issues with background colors
          useCORS: true, // Enable Cross-Origin Resource Sharing
        });
        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(data, "PNG", 0, 0, 210, 297); // Adjust dimensions for A4 size
        pdf.save(`vaccination_certificate_${certificateId}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-300 text-9xl opacity-20">VacciCare</div>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Vaccination Certificates
      </h1>
      {certificates.length > 0 ? (
        <div className="space-y-8">
          {certificates.map((certificate) => (
            <div
              id={`certificate-${certificate.bookedAppointmentDate}`}
              key={certificate.bookedAppointmentDate}
              className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white max-w-4xl mx-auto relative"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  Vaccination Certificate
                </h2>
                <p className="text-gray-600">
                  This is to certify that the below-mentioned vaccination has
                  been completed.
                </p>
              </div>
              <div className="border-t border-gray-300 pt-6 relative">
                <FaStamp className="absolute -bottom-5 left-28 text-gray-400 text-6xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="capitalize">
                      <strong className="font-medium text-gray-800">
                        Patient Name:
                      </strong>{" "}
                      {`${patientDetails.firstName} ${patientDetails.lastName}`}
                    </p>
                    <p>
                      <strong className="font-medium text-gray-800">
                        Patient Email:
                      </strong>{" "}
                      {patientDetails.email}
                    </p>
                    <p>
                      <strong className="font-medium text-gray-800">
                        Patient Phone:
                      </strong>{" "}
                      {patientDetails.phone}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="font-medium text-gray-800">
                        Appointment Date:
                      </strong>{" "}
                      {formatDate(certificate.bookedAppointmentDate)}
                    </p>
                    <p className="capitalize">
                      <strong className="font-medium text-gray-800">
                        Vaccination Center:
                      </strong>{" "}
                      {certificate.vaccinationCenter.centerName}
                    </p>
                    <p className="capitalize">
                      <strong className="font-medium text-gray-800">
                        Center Address:
                      </strong>{" "}
                      {`${certificate.vaccinationCenter.address.street}, ${certificate.vaccinationCenter.address.city}, ${certificate.vaccinationCenter.address.state} - ${certificate.vaccinationCenter.address.zipCode}`}
                    </p>
                    <p>
                      <strong className="font-medium text-gray-800">
                        Appointment Type:
                      </strong>{" "}
                      {certificate.appointmentType}
                    </p>
                    <p>
                      <strong className="font-medium text-gray-800">
                        Status:
                      </strong>{" "}
                      {certificate.appointmentStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Generated on {formatDate(new Date())}
                </p>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() =>
                    downloadCertificatePDF(certificate.bookedAppointmentDate)
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download as PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">
          No completed appointments found for generating certificates.
        </p>
      )}
    </div>
  );
};

export default VaccinationCertificate;
