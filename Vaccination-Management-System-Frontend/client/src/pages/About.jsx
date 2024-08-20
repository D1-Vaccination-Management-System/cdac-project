import React from "react";

function About() {
  return (
    <div className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-md text-base">
      <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-10">
        About Vaccination Management System
      </h1>

      <div className="space-y-10 text-lg text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            Our Mission
          </h2>
          <p className="text-xl">
            Our mission is to ensure the efficient and effective administration
            of vaccines to communities, enhancing public health and safety. We
            aim to provide a seamless experience for both healthcare providers
            and recipients by leveraging technology to manage vaccine
            distribution, appointment scheduling, and data tracking.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            What We Do
          </h2>
          <p className="text-xl">
            The Vaccination Management System is a comprehensive platform
            designed to facilitate the entire vaccination process. From
            registering individuals for vaccinations, to scheduling appointments
            at nearby vaccination centers, to tracking vaccination records and
            reporting data, our system covers all aspects of vaccine management.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            Features
          </h2>
          <ul className="list-disc list-inside space-y-3 text-xl">
            <li>User-friendly registration and appointment scheduling</li>
            <li>Real-time availability of vaccines and vaccination centers</li>
            <li>Secure and accessible vaccination records management</li>
            <li>
              Notifications and reminders for upcoming appointments and booster
              doses
            </li>
            <li>Integration with national health databases</li>
            <li>Comprehensive reporting and analytics tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            Our Commitment
          </h2>
          <p className="text-xl">
            We are committed to maintaining the highest standards of accuracy,
            security, and privacy in managing vaccination data. Our system is
            designed to comply with global health regulations and standards,
            ensuring that all personal and medical information is handled with
            the utmost care and confidentiality.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            Get in Touch
          </h2>
          <p className="text-xl">
            If you have any questions or need assistance, please feel free to
            contact our support team. We are here to help you with any concerns
            regarding the vaccination process and our system.
          </p>
          <p className="text-xl mt-4">
            <strong>Email:</strong> support@vaccicare.com
          </p>
          <p className="text-xl">
            <strong>Phone:</strong> +91 92895-18871
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-6 text-indigo-800">
            Developed By
          </h2>
          <p className="text-xl">
            This Vaccination Management System was developed by a dedicated team
            of engineers:
          </p>
          <ul className="list-disc list-inside space-y-3 text-xl mt-4">
            <li>Vijayshiv</li>
            <li>Eshwar</li>
            <li>Amol</li>
            <li>Nishank</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
