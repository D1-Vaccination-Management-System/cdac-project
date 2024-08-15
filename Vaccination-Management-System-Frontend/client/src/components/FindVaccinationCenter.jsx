import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { searchCenterByStateAndCity } from "../service/vaccination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const FindVaccinationCenter = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSearch = async () => {
    try {
      const response = await searchCenterByStateAndCity(city, state);

      if (response.data.length === 0) {
        toast.error("No centers found.");
      } else {
        setCenters(response.data);
      }
    } catch (error) {
      console.error("Error fetching centers:", error);
      toast.error("Error fetching centers. Please try again later.");
    }
  };

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-xl font-bold mb-4">
        Find Nearest Vaccination Center
      </h2>
      <div className="flex space-x-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-700 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border border-gray-700 p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Search
        </button>
      </div>
      <ToastContainer />
      {centers.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Vaccination Centers:</h3>
          <Slider {...settings}>
            {centers.map((center) => (
              <div key={center.centerName} className="p-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {center.centerName}
                  </h4>
                  <p className="text-gray-700 mb-1">
                    {center.address.street}, {center.address.city}
                  </p>
                  <p className="text-gray-700">{center.address.state}</p>
                  <p className="text-gray-700">{center.phoneNumber}</p>
                </div>
              </div>
            ))}
          </Slider>
          {/* Button to navigate to login */}
          <div className="text-center mt-12">
            <button
              onClick={handleLoginRedirect}
              className="bg-green-600 text-white px-6 py-3 rounded-full"
            >
              <Link to="/login">Login to Book Appointment</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindVaccinationCenter;
