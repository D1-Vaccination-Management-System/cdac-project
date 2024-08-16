import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import UpdateProfile from "../components/UpdatePatient";
import UpdateAddress from "../components/UpdateAddressDetails";
import DeleteProfile from "../components/DeleteProfile";
import AppointmentHistory from "../components/AppointmentHistory";
import ScheduleAppointment from "../components/ScheduleAppointment";
import UpcomingAppointments from "../components/UpcomingAppointments";
import SpecialOffer from "../components/SpecialOffer";
import { MdCalendarToday, MdUpcoming, MdHistory, MdStar } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
import VaccinationCertificate from "../components/AppointmentCertificate";

function PatientDashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [innerComponent, setInnerComponent] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = (component) => {
    if (component === "logout") {
      // Perform logout logic
      sessionStorage.clear();
      // Navigate to the login page
      navigate("/login");
    }
    if (component === "HomeDashBoard") {
      setSelectedComponent(null);
      setInnerComponent(null);
    } else {
      setSelectedComponent(component);
    }
  };
  const handleButtonClick1 = (component) => {
    setInnerComponent(component);
  };

  return (
    <div className="flex">
      <Sidebar onSelect={handleButtonClick} />
      <div className="flex-1 p-5">
        {selectedComponent === "UpdateProfile" && (
          <UpdateProfile setSelectedComponent={setSelectedComponent} />
        )}
        {selectedComponent === "UpdateAddress" && (
          <UpdateAddress setSelectedComponent={setSelectedComponent} />
        )}
        {selectedComponent === "certificate" && <VaccinationCertificate />}
        {selectedComponent === "DeleteProfile" && (
          <DeleteProfile setSelectedComponent={setSelectedComponent} />
        )}
        {selectedComponent === null && (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-left text-gray-800">
              Hello {sessionStorage.getItem("patientFirstName")}, Welcome to
              VacciCare...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 p-4 text-center">
                <MdCalendarToday
                  style={{ fontSize: "95px" }}
                  className="text-green-600 mb-4 mx-auto"
                />
                <button
                  onClick={() => handleButtonClick1("ScheduleAppointment")}
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                >
                  Schedule Appointment
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 p-4 text-center">
                <MdUpcoming
                  style={{ fontSize: "95px" }}
                  className="text-blue-600 mb-4 mx-auto"
                />
                <button
                  onClick={() => handleButtonClick1("ShowUpcomingAppointments")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                >
                  Upcoming Appointments
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-white shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 p-4 text-center">
                <MdHistory
                  style={{ fontSize: "95px" }}
                  className="text-yellow-600 mb-4 mx-auto"
                />
                <button
                  onClick={() => handleButtonClick1("ShowHistory")}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                >
                  Appointment History
                </button>
              </div>

              {/* Card 4 */}
              <div className="bg-white shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 p-4 text-center">
                <MdStar
                  style={{ fontSize: "95px" }}
                  className="text-gray-600 mb-4 mx-auto"
                />
                <button
                  onClick={() => handleButtonClick1("EmptyButton")}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                >
                  Special Offer
                </button>
              </div>
            </div>
            <div className="flex-1 p-5">
              {innerComponent === "ScheduleAppointment" && (
                <ScheduleAppointment setInnerComponent={setInnerComponent} />
              )}
              {innerComponent === "ShowUpcomingAppointments" && (
                <UpcomingAppointments setInnerComponent={setInnerComponent} />
              )}
              {innerComponent === "ShowHistory" && <AppointmentHistory />}
              {innerComponent === "EmptyButton" && (
                <SpecialOffer setInnerComponent={setInnerComponent} />
              )}
              {innerComponent === null && <></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
