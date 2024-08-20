import React from "react";
import { MdNavigateNext } from "react-icons/md";

function StepsToVaccination() {
  return (
    <div className="container mx-auto mt-14">
      <h2 className="text-5xl font-bold mb-16">
        Get Vaccinated In 4 Easy Steps
      </h2>

      <div className="flex justify-evenly items-center mb-8">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className="border-2 border-blue-600 rounded-full p-2">
            <span className="text-blue-600 text-lg font-bold">Step 1</span>
          </div>
        </div>
        <MdNavigateNext className="text-gray-500 text-3xl" />

        {/* Step 2 */}
        <div className="flex items-center">
          <div className="border-2 border-blue-600 rounded-full p-2">
            <span className="text-blue-600 text-lg font-bold">Step 2</span>
          </div>
        </div>
        <MdNavigateNext className="text-gray-500 text-3xl" />

        {/* Step 3 */}
        <div className="flex items-center">
          <div className="border-2 border-blue-600 rounded-full p-2">
            <span className="text-blue-600 text-lg font-bold">Step 3</span>
          </div>
        </div>
        <MdNavigateNext className="text-gray-500 text-3xl" />

        {/* Step 4 */}
        <div className="flex items-center">
          <div className="border-2 border-blue-600 rounded-full p-2">
            <span className="text-blue-600 text-lg font-bold">Step 4</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-between">
        {/* Step 1 Card */}
        <div className="p-4 bg-white shadow rounded w-full md:w-2/5 mb-4">
          <h2 className="font-bold text-lg mb-2">
            Step 1: Check your nearest vaccination center
          </h2>
          <p>Find the nearest vaccination center in your area.</p>
        </div>

        {/* Step 2 Card */}
        <div className="p-4 bg-white shadow rounded w-full md:w-2/5 mb-4">
          <h2 className="font-bold text-lg  mb-2">
            Step 2: Book an Appointment
          </h2>
          <p>Schedule your vaccination appointment online or by phone.</p>
        </div>

        {/* Step 3 Card */}
        <div className="p-4 bg-white shadow rounded w-full md:w-2/5 mb-4">
          <h2 className="font-bold text-lg  mb-2">
            Step 3: Get your vaccination safely at the time of your appointment
          </h2>
          <p>
            Receive your vaccination dose under safe and monitored conditions.
          </p>
        </div>

        {/* Step 4 Card */}
        <div className="p-4 bg-white shadow rounded w-full md:w-2/5 mb-4">
          <h2 className="font-bold text-lg  mb-2">
            Step 4: Download your vaccination certificate
          </h2>
          <p>
            Download your official vaccination certificate for record-keeping.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepsToVaccination;
