import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-screen-xl mx-auto p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4191/4191422.png"
                className="h-10"
                alt="VacciCare Logo"
              />
              <span className="text-3xl font-bold text-gray-800">
                VacciCare
              </span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resources
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Patient Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-login"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/health-staff/login"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Health Staff Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register-center"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Register Vaccination
                    <br />
                    Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Follow us
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Legal
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-600 transition duration-300"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-600">
            © 2024{" "}
            <a href="http://65.0.105.89/" className="hover:text-gray-500">
              VacciCare™
            </a>
            . All Rights Reserved.
          </span>

          {/* Social Media Icons */}
          <div className="flex space-x-5 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-500 transition duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 8 19">
                <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-500 transition duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord</span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-500 transition duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 17">
                <path d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-500 transition duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.885 4.057a9.936 9.936 0 0 1-2.805.77 4.894 4.894 0 0 0 2.147-2.716 9.84 9.84 0 0 1-3.127 1.2A4.933 4.933 0 0 0 12 6.51c0 .386.042.762.12 1.13a14.061 14.061 0 0 1-10.2-5.2A4.879 4.879 0 0 0 3.875 8.52c0 .6.066 1.187.2 1.74a4.927 4.927 0 0 0 2.016 2.8 4.868 4.868 0 0 1-2.2-.608v.061c0 2.328 1.657 4.268 3.858 4.711a4.83 4.83 0 0 1-1.237.16 4.837 4.837 0 0 1-.926-.094 4.924 4.924 0 0 0 4.607 3.42 9.877 9.877 0 0 1-6.146 2.116c-.398 0-.79-.022-1.18-.065A14.039 14.039 0 0 0 8.926 21c8.347 0 12.894-6.915 12.894-12.9 0-.197 0-.395-.014-.591A9.1 9.1 0 0 0 22 5.442a8.637 8.637 0 0 1-2.16.633Z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
