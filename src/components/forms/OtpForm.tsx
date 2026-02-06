"use client";

import { useState } from "react";

type OtpFormState = {
  countryCode: string;
  mobile: string;
  otp: string[];
};

type OtpErrors = {
  mobile?: string;
  otp?: string;
};

const MOBILE_REGEX = /^\d{10}$/;
const OTP_DIGITS = [0, 1, 2, 3];
const COUNTRY_CODES = [
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+1", label: "Canada", flag: "🇨🇦" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+64", label: "New Zealand", flag: "🇳🇿" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+34", label: "Spain", flag: "🇪🇸" },
  { code: "+31", label: "Netherlands", flag: "🇳🇱" },
  { code: "+46", label: "Sweden", flag: "🇸🇪" },
  { code: "+47", label: "Norway", flag: "🇳🇴" },
  { code: "+45", label: "Denmark", flag: "🇩🇰" },
  { code: "+41", label: "Switzerland", flag: "🇨🇭" },
  { code: "+43", label: "Austria", flag: "🇦🇹" },
  { code: "+32", label: "Belgium", flag: "🇧🇪" },
  { code: "+351", label: "Portugal", flag: "🇵🇹" },
  { code: "+353", label: "Ireland", flag: "🇮🇪" },
  { code: "+7", label: "Russia", flag: "🇷🇺" },
  { code: "+380", label: "Ukraine", flag: "🇺🇦" },
  { code: "+48", label: "Poland", flag: "🇵🇱" },
  { code: "+420", label: "Czech Republic", flag: "🇨🇿" },
  { code: "+36", label: "Hungary", flag: "🇭🇺" },
  { code: "+30", label: "Greece", flag: "🇬🇷" },
  { code: "+90", label: "Turkey", flag: "🇹🇷" },
  { code: "+971", label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+965", label: "Kuwait", flag: "🇰🇼" },
  { code: "+974", label: "Qatar", flag: "🇶🇦" },
  { code: "+973", label: "Bahrain", flag: "🇧🇭" },
  { code: "+968", label: "Oman", flag: "🇴🇲" },
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+92", label: "Pakistan", flag: "🇵🇰" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", label: "Nepal", flag: "🇳🇵" },
  { code: "+975", label: "Bhutan", flag: "🇧🇹" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+82", label: "South Korea", flag: "🇰🇷" },
  { code: "+66", label: "Thailand", flag: "🇹🇭" },
  { code: "+65", label: "Singapore", flag: "🇸🇬" },
  { code: "+60", label: "Malaysia", flag: "🇲🇾" },
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+63", label: "Philippines", flag: "🇵🇭" },
  { code: "+84", label: "Vietnam", flag: "🇻🇳" },
  { code: "+852", label: "Hong Kong", flag: "🇭🇰" },
  { code: "+886", label: "Taiwan", flag: "🇹🇼" },
  { code: "+55", label: "Brazil", flag: "🇧🇷" },
  { code: "+52", label: "Mexico", flag: "🇲🇽" },
  { code: "+54", label: "Argentina", flag: "🇦🇷" },
  { code: "+57", label: "Colombia", flag: "🇨🇴" },
  { code: "+56", label: "Chile", flag: "🇨🇱" },
  { code: "+51", label: "Peru", flag: "🇵🇪" },
];

export default function OtpForm() {
  const [form, setForm] = useState<OtpFormState>({
    countryCode: "+91",
    mobile: "",
    otp: ["", "", "", ""],
  });

  const [errors, setErrors] = useState<OtpErrors>({});
  const [status, setStatus] = useState<string>("");

  const validate = () => {
    const nextErrors: OtpErrors = {};
    if (!form.mobile.trim()) {
      nextErrors.mobile = "Mobile number is required.";
    } else if (!MOBILE_REGEX.test(form.mobile.trim())) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (validate()) {
      setStatus("Validation passed. OTP sending requires backend integration.");
    }
  };

  const isMobileValid = MOBILE_REGEX.test(form.mobile.trim());

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="otp-mobile" className="text-xs text-slate-400">
          Mobile Number
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="w-full sm:w-44">
            <label
              htmlFor="otp-country"
              className="text-xs font-medium text-slate-300"
            >
              Country
            </label>
            <div className="relative mt-2">
              <select
                id="otp-country"
                aria-label="Country code"
                value={form.countryCode}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    countryCode: event.target.value,
                  }))
                }
                className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 pr-9 text-sm text-white focus:border-brand-500 outline-none"
              >
                {COUNTRY_CODES.map((country) => (
                  <option
                    key={`${country.label}-${country.code}`}
                    value={country.code}
                  >
                    {country.flag} {country.label} ({country.code})
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="currentColor"
              >
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="otp-mobile"
              className="text-xs font-medium text-slate-300"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="otp-mobile"
                name="mobile"
                type="tel"
                placeholder="9876543210"
                autoComplete="tel"
                inputMode="numeric"
                pattern="^\d{10}$"
                maxLength={10}
                value={form.mobile}
                onChange={(event) => {
                  const onlyDigits = event.target.value.replace(/\D/g, "");
                  setForm((prev) => ({ ...prev, mobile: onlyDigits }));
                }}
                className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none ${
                  errors.mobile ? "border-rose-500" : "border-slate-700"
                }`}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={
                  errors.mobile ? "otp-mobile-error" : undefined
                }
                required
              />
            </div>
            {errors.mobile ? (
              <p id="otp-mobile-error" className="mt-1 text-xs text-rose-400">
                {errors.mobile}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs text-slate-400">OTP</span>
        <div className="grid grid-cols-4 gap-2">
          {OTP_DIGITS.map((digit) => (
            <input
              key={`otp-${digit}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="one-time-code"
              value={form.otp[digit]}
              onChange={(event) => {
                const next = event.target.value
                  .split("")
                  .filter((char) => /\d/.test(char))
                  .join("");
                setForm((prev) => {
                  const updated = [...prev.otp];
                  updated[digit] = next;
                  return { ...prev, otp: updated };
                });
              }}
              className={`h-12 rounded-xl border bg-slate-950 text-center text-base font-semibold text-white focus:border-brand-500 focus:outline-none ${
                errors.otp ? "border-rose-500" : "border-slate-700"
              }`}
              aria-label={`OTP digit ${digit + 1}`}
            />
          ))}
        </div>
        {errors.otp ? (
          <p className="text-xs text-rose-400" id="otp-error">
            {errors.otp}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!isMobileValid}
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
          isMobileValid
            ? "bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 hover:opacity-90"
            : "cursor-not-allowed bg-slate-800 text-slate-500"
        }`}
      >
        Send OTP
      </button>

      <p className="text-xs text-slate-500">
        By continuing, you agree to receive transactional messages.
      </p>

      {status ? <p className="text-xs text-emerald-400">{status}</p> : null}
    </form>
  );
}
