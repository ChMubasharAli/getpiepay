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
  // Form state
  const [inquiryPurpose, setInquiryPurpose] = useState("General Information");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Reset form function
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
    setRecaptchaError(null);
    setFieldErrors({});
    recaptchaRef.current?.reset();
  };

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "company":
        return value.trim() ? "" : "This field is required";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "phone":
        return value.trim() ? "" : "Phone number is required";
      default:
        return "";
    }
  };

  // Handle field blur for validation
  const handleFieldBlur = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = [
      { name: "firstName", value: firstName },
      { name: "lastName", value: lastName },
      { name: "company", value: company },
      { name: "email", value: email },
      { name: "phone", value: phone },
    ];

    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const error = validateField(field.name, field.value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setFieldErrors(newErrors);

    const hasNoErrors = Object.keys(newErrors).length === 0;
    const hasRecaptcha = !!recaptchaToken;

    return hasNoErrors && hasRecaptcha;
  };

  // reCAPTCHA handlers
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaError(null);
    setErrorMsg(null);
  };

  const handleRecaptchaError = () => {
    setRecaptchaError(
      "reCAPTCHA failed to load. Please refresh the page and try again."
    );
    setRecaptchaToken(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaError("reCAPTCHA verification expired. Please verify again.");
  };

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setRecaptchaError(null);
    recaptchaRef.current?.reset();
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setRecaptchaError(null);
    setSuccessMsg(null);

    // Validate all fields
    if (!isFormValid()) {
      if (!recaptchaToken) {
        setRecaptchaError("Please complete the reCAPTCHA verification.");
      }
      setErrorMsg("Please fix the errors above before submitting.");
      return;
    }

    const payload: FormDataShape = {
      inquiryPurpose,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      title: title.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      recaptchaToken: recaptchaToken!,
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
        // Handle reCAPTCHA errors specifically
        if (data?.message?.toLowerCase().includes("recaptcha")) {
          resetRecaptcha();
          setRecaptchaError(data.message);
          throw new Error(
            "Security verification failed. Please complete the reCAPTCHA again."
          );
        }
        throw new Error(
          data?.message || "Failed to send your message. Please try again."
        );
      }

      setSuccessMsg(
        data.message ||
          "Your message has been sent successfully! We'll contact you soon."
      );
      resetForm();

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="relative bg-white rounded-xl w-full max-w-lg md:max-w-2xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Close"
          disabled={loading}
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            We would love to learn how we can help you transform your business.
            Fill in the form and we'll get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Inquiry Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inquiry Purpose *
            </label>
            <select
              value={inquiryPurpose}
              onChange={(e) => setInquiryPurpose(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors"
              required
              disabled={loading}
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

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
                type="text"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors ${
                  fieldErrors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={loading}
              />
              {fieldErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
                type="text"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors ${
                  fieldErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={loading}
              />
              {fieldErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onBlur={(e) => handleFieldBlur("company", e.target.value)}
              type="text"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors ${
                fieldErrors.company ? "border-red-500" : "border-gray-300"
              }`}
              required
              disabled={loading}
            />
            {fieldErrors.company && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.company}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors"
              disabled={loading}
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Email *
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                type="email"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors ${
                  fieldErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={loading}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone *
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                type="tel"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors ${
                  fieldErrors.phone ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={loading}
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How can we help you?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] transition-colors resize-vertical"
              disabled={loading}
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleRecaptchaChange}
              onErrored={handleRecaptchaError}
              onExpired={handleRecaptchaExpired}
              ref={recaptchaRef}
            />
          </div>

          {/* reCAPTCHA Error */}
          {recaptchaError && (
            <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-3 rounded-md">
              {recaptchaError}
            </div>
          )}

          {/* Global Error Message */}
          {errorMsg && (
            <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-3 rounded-md">
              {errorMsg}
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="text-sm text-green-600 text-center bg-green-50 py-2 px-3 rounded-md">
              {successMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!recaptchaToken || loading || !isFormValid()}
            className={`w-full py-3 px-4 text-white font-medium rounded-md transition-all ${
              !recaptchaToken || loading || !isFormValid()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#49AA43] hover:bg-[#3d9438] shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Required fields note */}
          <p className="text-xs text-gray-500 text-center">* Required fields</p>
        </form>
      </div>
    </div>
  );
}
