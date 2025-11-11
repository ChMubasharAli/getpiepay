"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { X } from "lucide-react";

interface ApplyNowModalProps {
  onClose: () => void;
}

interface FormDataShape {
  inquiryPurpose: string;
  firstName: string;
  lastName: string;
  company: string;
  title?: string;
  email: string;
  phone: string;
  message?: string;
  recaptchaToken: string;
}

export default function ApplyNowModal({ onClose }: ApplyNowModalProps) {
  const [inquiryPurpose, setInquiryPurpose] = useState("General Information");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const resetForm = () => {
    setInquiryPurpose("General Information");
    setFirstName("");
    setLastName("");
    setCompany("");
    setTitle("");
    setEmail("");
    setPhone("");
    setMessage("");
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      company.trim() &&
      email.trim() &&
      phone.trim() &&
      recaptchaToken
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isFormValid()) {
      setErrorMsg("Please fill required fields and complete the reCAPTCHA.");
      return;
    }

    const payload: FormDataShape = {
      inquiryPurpose,
      firstName,
      lastName,
      company,
      title,
      email,
      phone,
      message,
      recaptchaToken: recaptchaToken as string,
    };

    setLoading(true);

    try {
      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send. Try again later.");
      }

      setSuccessMsg("Your message has been sent. We'll contact you soon.");
      resetForm();
      // optionally close modal after a delay
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1800);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="relative bg-white rounded-xl w-full max-w-lg md:max-w-2xl p-6 sm:p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-3">
          Get In Touch
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We would love to learn how we can help you transform your business.
          Fill in the form and we’ll get back to you shortly.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inquiry Purpose*
            </label>
            <select
              value={inquiryPurpose}
              onChange={(e) => setInquiryPurpose(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
              required
            >
              <option>General Information</option>
              <option>Service and Solution Information</option>
              <option>Investor Relations</option>
              <option>Consultant Relations</option>
              <option>Media Relations</option>
              <option>Careers</option>
              <option>Website Feedback</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company*
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Email*
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone*
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How can we help you?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]"
            />
          </div>

          {/* reCAPTCHA v2 checkbox */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => {
                setRecaptchaToken(token);
                setErrorMsg(null);
              }}
              ref={recaptchaRef}
            />
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 text-center">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-sm text-green-600 text-center">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!recaptchaToken || loading}
            className={`w-full py-3 text-white rounded-md transition ${
              !recaptchaToken || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#49AA43] hover:bg-[#3d9438]"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
