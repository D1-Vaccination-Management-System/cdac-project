import React, { useState } from "react";
import ScheduleAppointment from "../components/ScheduleAppointment";
import UpcomingAppointments from "../components/UpcomingAppointments";
import AppointmentHistory from "../components/AppointmentHistory";
import Sidebar from "../components/SideBar"; // Make sure to fix the import name to match your file
import { MdCalendarToday, MdUpcoming, MdHistory, MdStar } from "react-icons/md"; // Import icons

function PatientDashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/5">
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md h-full">
            <Sidebar onSelect={handleButtonClick} />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-4/5 p-4 bg-white shadow-lg rounded-lg">
          {/* Centered and Styled Welcome Message */}
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Welcome to Your Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 p-4 text-center">
              <MdCalendarToday
                style={{ fontSize: "95px" }}
                className="text-green-600 mb-4 mx-auto"
              />
              <button
                onClick={() => handleButtonClick("ScheduleAppointment")}
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
                onClick={() => handleButtonClick("ShowUpcomingAppointments")}
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
                onClick={() => handleButtonClick("ShowHistory")}
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
                onClick={() => handleButtonClick("EmptyButton")}
                className="bg-gray-600 hover:bg-gray-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
              >
                Special Offer
              </button>
            </div>
          </div>

          {/* Component Display */}
          <div className="mt-8">
            {selectedComponent === "ScheduleAppointment" && (
              <ScheduleAppointment />
            )}
            {selectedComponent === "ShowUpcomingAppointments" && (
              <UpcomingAppointments />
            )}
            {selectedComponent === "ShowHistory" && <AppointmentHistory />}
            {selectedComponent === "EmptyButton" && (
              <div className="text-gray-600 text-lg">Special Offer Details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
