import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdHealthAndSafety } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegFileLines } from "react-icons/fa6";
import FindVaccinationCenter from "../components/FindVaccinationCenter";
import StepsToVaccination from "./StepsToVaccination";
import ImageSlider from "../components/ImageSlider";
import DoctorConsultationModal from "../components/DoctorConsultationModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto mt-20 px-4">
      {/* Main Content */}
      <div className="flex flex-wrap justify-between">
        {/* Left Side - Image Slider */}
        <div className="w-full md:w-2/5 mb-8">
          <ImageSlider />
        </div>

        {/* Right Side - Cards */}
        <div className="w-full md:w-3/5">
          <div className="flex flex-wrap ml-12">
            {/* Left Column */}
            <div className="w-full md:w-1/2 flex flex-col space-y-4">
              {/* Card 1 */}
              <div className="p-4 bg-white shadow rounded w-[85%] h-48">
                <div className="flex items-center justify-center mb-2">
                  <MdHealthAndSafety className="text-green-500 text-5xl" />
                </div>
                <h2 className="font-bold text-md text-center mb-2">
                  100% Safe
                </h2>
                <p className="text-center text-sm">
                  Your safety is our priority.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 bg-white shadow rounded w-[85%] h-48">
                <div className="flex items-center justify-center mb-2">
                  <TbTruckDelivery className="text-orange-600 text-5xl" />
                </div>
                <h2 className="font-bold text-md text-center mb-2">
                  Home Securely Pickup
                </h2>
                <p className="text-center text-sm">
                  Convenient and secure home pickup.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col space-y-4">
              {/* Card 3 */}
              <div className="p-4 bg-white shadow rounded w-[85%] h-48">
                <div className="flex items-center justify-center mb-2">
                  <FaRegFileLines className="text-blue-600 text-5xl" />
                </div>
                <h2 className="font-bold text-md text-center mb-2">
                  Check your Report Online
                </h2>
                <p className="text-center text-sm">
                  Access your reports from anywhere.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-4 bg-white shadow rounded w-[85%] h-48">
                <div className="flex items-center justify-center mb-2">
                  <FaUserDoctor className="text-yellow-600 text-5xl" />
                </div>
                <h2 className="font-bold text-md text-center mb-2">
                  Free Doctor Consultation
                </h2>
                <p className="text-center text-sm">
                  Get professional medical advice for free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrate StepsToVaccination component */}
      <StepsToVaccination />

      {/* Find the vaccination center near you */}

      <FindVaccinationCenter className="text-center" />

      {/* Doctor Consultation Modal */}
      <DoctorConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
