import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full lg:pr-6 mb-6 lg:mb-0 flex items-center justify-center">
        <img
          src="https://feateducation.in/contact%20us%20vector-01.svg" // Replace with your image URL
          alt="Contact Us"
          className="w-full h-auto max-w-full object-cover rounded-lg shadow-lg"
          style={{ maxHeight: "calc(100vh - 2rem)" }} // Adjust based on padding
        />
      </div>

      {/* Form Section */}
      <div
        className="lg:w-1/2 w-full bg-white shadow-lg rounded-lg p-8 space-y-6 flex flex-col justify-center"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full max-w-md py-2 px-4 rounded-md text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
