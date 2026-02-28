"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Contact = {
  id: string;
  countryCode: string;
  mobile: string;
  verifiedAt: string;
  createdAt: string;
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TabType = "phone" | "contact";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("phone");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [validatedApiKey, setValidatedApiKey] = useState("");

  // Check if user is authenticated via session cookie
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setAuthenticated(true);
          // Get API key from localStorage temporarily for API calls
          const savedKey = localStorage.getItem("temp_admin_key");
          if (savedKey) {
            setValidatedApiKey(savedKey);
            await fetchAllData(savedKey);
          }
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setInitializing(false);
    }
  };

  // Login with API key
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      setError("Please enter an API key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Authenticate and get HTTP-only cookie
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid API key");
      }

      // Save API key temporarily for API calls (will be removed on logout)
      localStorage.setItem("temp_admin_key", apiKey);
      setValidatedApiKey(apiKey);

      // Authentication successful
      setAuthenticated(true);
      setApiKey("");
      await fetchAllData(apiKey);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      localStorage.removeItem("temp_admin_key");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "DELETE",
        credentials: "include",
      });

      localStorage.removeItem("temp_admin_key");
      setAuthenticated(false);
      setContacts([]);
      setSubmissions([]);
      setApiKey("");
      setValidatedApiKey("");

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Fetch all data
  const fetchAllData = async (key?: string) => {
    const authKey = key || validatedApiKey;
    if (!authKey) {
      console.error("No API key available");
      return;
    }

    setLoading(true);
    try {
      await Promise.all([fetchContacts(authKey), fetchSubmissions(authKey)]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contacts
  const fetchContacts = async (key: string) => {
    try {
      console.log("Fetching contacts with key:", key.substring(0, 10) + "...");

      const response = await fetch("/api/otp/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
        credentials: "include",
      });

      console.log("Contacts response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Contacts data:", data);
        setContacts(data.contacts || []);
      } else {
        console.error("Failed to fetch contacts:", response.status);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Fetch submissions
  const fetchSubmissions = async (key: string) => {
    try {
      console.log(
        "Fetching submissions with key:",
        key.substring(0, 10) + "...",
      );

      const response = await fetch("/api/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
        credentials: "include",
      });

      console.log("Submissions response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Submissions data:", data);
        setSubmissions(data.submissions || []);
      } else {
        console.error("Failed to fetch submissions:", response.status);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // Update submission status
  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${validatedApiKey}`,
        },
        credentials: "include",
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Export functions
  const exportPhoneToCSV = () => {
    const csv = [
      ["Phone Number", "Country Code", "Verified Date"],
      ...contacts.map((c) => [
        `${c.countryCode}${c.mobile}`,
        c.countryCode,
        new Date(c.verifiedAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    downloadCSV(csv, "verified-phone-numbers");
  };

  const exportContactsToCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Service", "Message", "Status", "Date"],
      ...submissions.map((s) => [
        s.name,
        s.email,
        s.phone,
        s.service,
        `"${s.message.replace(/"/g, '""')}"`,
        s.status,
        new Date(s.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    downloadCSV(csv, "contact-form-submissions");
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const filteredSubmissions = submissions.filter((sub) =>
    filter === "all" ? true : sub.status === filter,
  );

  const submissionStats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    closed: submissions.filter((s) => s.status === "closed").length,
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              AURA Securities Admin
            </h1>
            <p className="text-slate-400">Secure Dashboard Access</p>
            <div className="mt-4 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-xs text-green-400">
                🔒 Secured with HTTP-only cookies
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError("");
                }}
                placeholder="Enter your admin API key"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-700 bg-slate-900 text-white placeholder:text-slate-600 focus:border-purple-500 focus:outline-none"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold transition bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
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
                  Authenticating...
                </span>
              ) : (
                "Secure Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-slate-400 hover:text-slate-300 transition inline-flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard - rest of the code stays same, just with proper data display
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                AURA Securities Dashboard
              </h1>
              <p className="text-slate-400">🔒 Secured Session Active</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchAllData()}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Secure Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("phone")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === "phone"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-slate-900/50 text-slate-400 hover:bg-slate-900"
              }`}
            >
              📱 Verified Phone Numbers ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === "contact"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-slate-900/50 text-slate-400 hover:bg-slate-900"
              }`}
            >
              📝 Contact Form Submissions ({submissions.length})
            </button>
          </div>
        </div>

        {/* Phone Tab */}
        {activeTab === "phone" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  OTP Verified Contacts
                </h2>
                <button
                  onClick={exportPhoneToCSV}
                  disabled={contacts.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                >
                  📥 Export CSV
                </button>
              </div>
              {loading ? (
                <p className="text-center text-slate-400 py-8">Loading...</p>
              ) : contacts.length === 0 ? (
                <p className="text-center text-slate-400 py-8">
                  No verified contacts yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          #
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Phone Number
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Country Code
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Verified Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {contacts.map((contact, i) => (
                        <tr
                          key={contact.id}
                          className="hover:bg-slate-700/30 transition"
                        >
                          <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                          <td className="px-6 py-4 text-white font-medium">
                            {contact.countryCode} {contact.mobile}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {contact.countryCode}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {new Date(contact.verifiedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Contact Form Submissions
                </h2>
                <button
                  onClick={exportContactsToCSV}
                  disabled={submissions.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                >
                  📥 Export CSV
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">
                    {submissionStats.total}
                  </div>
                  <div className="text-sm text-slate-400">Total</div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {submissionStats.new}
                  </div>
                  <div className="text-sm text-slate-400">New</div>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {submissionStats.contacted}
                  </div>
                  <div className="text-sm text-slate-400">Contacted</div>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {submissionStats.closed}
                  </div>
                  <div className="text-sm text-slate-400">Closed</div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-4 shadow-2xl">
              <div className="flex gap-2">
                {["all", "new", "contacted", "closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      filter === status
                        ? "bg-purple-600 text-white"
                        : "bg-slate-900/50 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
              {loading ? (
                <p className="text-center text-slate-400 py-8">Loading...</p>
              ) : filteredSubmissions.length === 0 ? (
                <p className="text-center text-slate-400 py-8">
                  No submissions found
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          #
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Service
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Message
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {filteredSubmissions.map((sub, i) => (
                        <tr
                          key={sub.id}
                          className="hover:bg-slate-700/30 transition"
                        >
                          <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                          <td className="px-6 py-4 text-white font-medium">
                            {sub.name}
                          </td>
                          <td className="px-6 py-4 text-slate-300">
                            {sub.email}
                          </td>
                          <td className="px-6 py-4 text-slate-300">
                            {sub.phone}
                          </td>
                          <td className="px-6 py-4 text-slate-300">
                            {sub.service}
                          </td>
                          <td className="px-6 py-4 text-slate-400 max-w-xs">
                            <div className="truncate" title={sub.message}>
                              {sub.message}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={sub.status}
                              onChange={(e) =>
                                updateSubmissionStatus(sub.id, e.target.value)
                              }
                              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                sub.status === "new"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : sub.status === "contacted"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
