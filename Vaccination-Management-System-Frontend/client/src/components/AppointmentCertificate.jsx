import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VaccinationCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = "http://localhost:9999";

  // Retrieve patient details from session storage
  const patientDetails = {
    firstName: sessionStorage.getItem('patientFirstName'),
    lastName: sessionStorage.getItem('patientLastName'),
    email: sessionStorage.getItem('patientEmail'),
    phone: sessionStorage.getItem('patientPhone'),
    address: {
      street: sessionStorage.getItem('street'),
      city: sessionStorage.getItem('city'),
      state: sessionStorage.getItem('state'),
      zipCode: sessionStorage.getItem('zipCode')
    }
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      const patientId = sessionStorage.getItem('patientId');

      if (!patientId) {
        setError('Patient ID not found in session storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/patient/get-patient-appointment-history`, {
          params: { patientId }
        });
        // Filter for completed appointments
        const completedAppointments = response.data.filter(appointment => appointment.appointmentStatus === 'COMPLETED');
        setCertificates(completedAppointments);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Vaccination Certificates</h1>
      {certificates.length > 0 ? (
        <div className="space-y-6">
          {certificates.map((certificate) => (
            <div key={certificate.bookedAppointmentDate} className="border border-gray-300 p-6 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-4">Vaccination Certificate</h2>
              <p><strong>Patient Name:</strong> {`${patientDetails.firstName} ${patientDetails.lastName}`}</p>
              <p><strong>Patient Email:</strong> {patientDetails.email}</p>
              <p><strong>Patient Phone:</strong> {patientDetails.phone}</p>
              <p><strong>Appointment Date:</strong> {new Date(certificate.bookedAppointmentDate).toLocaleDateString()}</p>
              <p><strong>Vaccination Center:</strong> {certificate.vaccinationCenter.centerName}</p>
              <p><strong>Center Address:</strong> {certificate.vaccinationCenter.address.street}, {certificate.vaccinationCenter.address.city}, {certificate.vaccinationCenter.address.state} - {certificate.vaccinationCenter.address.zipCode}</p>
              <p><strong>Appointment Type:</strong> {certificate.appointmentType}</p>
              <p><strong>Status:</strong> {certificate.appointmentStatus}</p>
              <p className="mt-4 text-sm text-gray-600">This is to certify that the above-mentioned vaccination has been completed.</p>
              <p className="mt-2 text-xs text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No completed appointments found for generating certificates.</p>
      )}
    </div>
  );
};

export default VaccinationCertificate;
