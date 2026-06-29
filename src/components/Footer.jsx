import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Left Section */}
          <div>
            <h2 className="text-4xl font-bold italic text-blue-600">
              ResumeIQ AI
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Precision analysis for the modern professional.
            </p>

            <p className="mt-10 text-sm text-gray-500">
              © 2026 ResumeIQ AI. All rights reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2  gap-x-12 gap-y-5  text-sm uppercase  text-gray-600">

            <Link
              to="/privacy"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </Link>

            <Link
              to="/documentation"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              API Documentation
            </Link>

            <Link
              to="/support"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Support
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;