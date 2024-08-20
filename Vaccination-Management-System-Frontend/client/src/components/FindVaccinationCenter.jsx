import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchCenterByStateAndCity } from "../service/vaccination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import Select from "react-select"; // Import react-select for dropdown
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// List of all states and union territories of India
const indianStates = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "Chandigarh", label: "Chandigarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Delhi", label: "Delhi" },
  { value: "Puducherry", label: "Puducherry" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
];

const FindVaccinationCenter = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState(null); // State selected from dropdown
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSearch = async () => {
    try {
      if (!state) {
        toast.error("Please select a state.");
        return;
      }
      const response = await searchCenterByStateAndCity(city, state.value); // Pass state value (not label)

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
    slidesToShow: 4, // Adjust this to show more or fewer slides
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
        <Select
          value={state}
          onChange={setState}
          options={indianStates}
          placeholder="Select State"
          className="w-72" // Set custom width for dropdown
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
          <div className="slider-container w-full overflow-hidden capitalize">
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
          </div>

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
