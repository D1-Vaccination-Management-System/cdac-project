import React from "react";

function Sidebar({ onSelect }) {
  return (
    <div className="text-center p-5 bg-gray-800 rounded-lg shadow-md">
      <h3 className="mb-5 text-2xl font-bold text-gray-200">
        Patient Dashboard
      </h3>

      <ul className="list-none p-0 m-0">
        <li
          onClick={() => onSelect("HomeDashBoard")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Dashboard
        </li>
        <li
          onClick={() => onSelect("UpdateProfile")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Update Profile
        </li>
        <li
          onClick={() => onSelect("UpdateAddress")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Update Address
        </li>
        <li
          onClick={() => onSelect("certificate")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Vaccination Certificate
        </li>
        <li
          onClick={() => onSelect("DeleteProfile")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Delete Profile
        </li>
        <li
          onClick={() => onSelect("logout")}
          className="cursor-pointer my-2 py-2 px-4 rounded-md bg-gray-600 text-gray-200 transition-colors duration-300 hover:bg-gray-500"
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
