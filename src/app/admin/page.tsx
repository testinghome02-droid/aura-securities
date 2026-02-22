"use client";

import { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState<TabType>("phone");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const fetchContacts = async (key: string) => {
    try {
      const response = await fetch("/api/otp/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch contacts");
      }

      setContacts(data.contacts);
    } catch (err: any) {
      console.error("Error fetching contacts:", err);
    }
  };

  const fetchSubmissions = async (key: string) => {
    try {
      const response = await fetch("/api/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch submissions");
      }

      setSubmissions(data.submissions);
    } catch (err: any) {
      console.error("Error fetching submissions:", err);
    }
  };

  const fetchAllData = async (key: string) => {
    setLoading(true);
    setError("");

    try {
      await Promise.all([fetchContacts(key), fetchSubmissions(key)]);
      setAuthenticated(true);
      localStorage.setItem("admin_api_key", key);
    } catch (err: any) {
      setError(err.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)),
      );
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem("admin_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      fetchAllData(savedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAllData(apiKey);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_api_key");
    setAuthenticated(false);
    setContacts([]);
    setSubmissions([]);
    setApiKey("");
  };

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

  const filteredSubmissions = submissions.filter((sub) =>
    filter === "all" ? true : sub.status === filter,
  );

  const submissionStats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    closed: submissions.filter((s) => s.status === "closed").length,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              AURA Securities Admin
            </h1>
            <p className="text-slate-400">Dashboard Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your admin API key"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-700 bg-slate-900 text-white placeholder:text-slate-600 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold transition bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

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
              <p className="text-slate-400">Manage all customer data</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchAllData(apiKey)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                🚪 Logout
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

        {/* Verified Phone Numbers Tab */}
        {activeTab === "phone" && (
          <>
            {/* Phone Stats */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 mb-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    OTP Verified Contacts
                  </h2>
                  <p className="text-sm text-slate-400">
                    Total verified: {contacts.length}
                  </p>
                </div>
                <button
                  onClick={exportPhoneToCSV}
                  disabled={contacts.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Phone Table */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
              {loading ? (
                <div className="p-12 text-center text-slate-400">
                  Loading contacts...
                </div>
              ) : contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-slate-400 mb-4">
                    No verified phone numbers yet
                  </div>
                  <p className="text-sm text-slate-500">
                    Phone numbers will appear here after users verify via OTP
                  </p>
                </div>
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
                      {contacts.map((contact, index) => (
                        <tr
                          key={contact.id}
                          className="hover:bg-slate-700/30 transition"
                        >
                          <td className="px-6 py-4 text-slate-400">
                            {index + 1}
                          </td>
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
          </>
        )}

        {/* Contact Form Submissions Tab */}
        {activeTab === "contact" && (
          <>
            {/* Submission Stats */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 mb-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  Contact Form Submissions
                </h2>
                <button
                  onClick={exportContactsToCSV}
                  disabled={submissions.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📥 Export CSV
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            {/* Filter Buttons */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-4 mb-6 shadow-2xl">
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

            {/* Submissions List */}
            <div className="space-y-4">
              {loading ? (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 text-center text-slate-400 shadow-2xl">
                  Loading submissions...
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 text-center shadow-2xl">
                  <div className="text-slate-400 mb-4">
                    No {filter !== "all" ? filter : ""} submissions found
                  </div>
                </div>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl hover:border-purple-500/30 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {submission.name}
                        </h3>
                        <div className="flex gap-4 text-sm text-slate-400">
                          <span>📧 {submission.email}</span>
                          <span>📱 {submission.phone}</span>
                        </div>
                      </div>
                      <select
                        value={submission.status}
                        onChange={(e) =>
                          updateSubmissionStatus(submission.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-lg text-sm font-medium border-0 outline-none cursor-pointer ${
                          submission.status === "new"
                            ? "bg-blue-500/20 text-blue-400"
                            : submission.status === "contacted"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-slate-500">Service:</span>
                        <span className="text-white ml-2">
                          {submission.service}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500">Message:</span>
                        <p className="text-slate-300 mt-1">
                          {submission.message}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500 pt-2">
                        Submitted:{" "}
                        {new Date(submission.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
