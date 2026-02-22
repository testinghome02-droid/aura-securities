"use client";

import { useState, useRef } from "react";

type OtpStep = "ENTER_MOBILE" | "VERIFY_OTP" | "SUCCESS";

const COUNTRY_CODES = [
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+65", label: "Singapore", flag: "🇸🇬" },
];

export default function OtpForm() {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState<OtpStep>("ENTER_MOBILE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter exactly 10 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryCode, mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStep("VERIFY_OTP");
      startTimer();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryCode, mobile, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStep("SUCCESS");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
      setOtp(["", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", ""]);
    await handleSendOtp(new Event("submit") as any);
  };

  const handleEditNumber = () => {
    setStep("ENTER_MOBILE");
    setOtp(["", "", "", ""]);
    setError("");
  };

  if (step === "SUCCESS") {
    return (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Verified Successfully!</h3>
        <p className="text-slate-400">
          {countryCode} {mobile} has been verified
        </p>
        <button
          onClick={() => {
            setStep("ENTER_MOBILE");
            setMobile("");
            setOtp(["", "", "", ""]);
          }}
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          Verify another number
        </button>
      </div>
    );
  }

  if (step === "VERIFY_OTP") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-400">
            Code sent to {countryCode} {mobile}
          </p>
          <button
            type="button"
            onClick={handleEditNumber}
            className="text-xs text-purple-400 hover:text-purple-300"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-700 bg-slate-900 text-white focus:border-purple-500 focus:outline-none"
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 4}
          className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white hover:opacity-90"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-slate-500">
              Resend OTP in {resendTimer}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOtp} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Country
        </label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-700 bg-slate-900 text-white focus:border-purple-500 focus:outline-none"
        >
          {COUNTRY_CODES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.label} ({country.code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Mobile Number
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="9876543210"
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-700 bg-slate-900 text-white placeholder:text-slate-600 focus:border-purple-500 focus:outline-none"
          maxLength={10}
        />
        <p className="text-xs text-slate-500 mt-1">
          Enter 10-digit mobile number
        </p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading || mobile.length !== 10}
        className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white hover:opacity-90"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <p className="text-xs text-slate-500 text-center">
        You will receive a 4-digit verification code
      </p>
    </form>
  );
}
