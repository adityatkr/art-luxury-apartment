"use client";

import { useState, useEffect } from "react";

type Booking = {
  id: string; name: string; email: string; phone: string;
  roomType: string; checkIn: string; checkOut: string;
  adults: number; children: number; mealPlan: string;
  status: string; totalNights: number; totalAmount: number;
  advancePaid: number; createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/booking")
      .then((r) => r.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Failed to load bookings"); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/booking/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const total = bookings.reduce((s, b) => s + b.totalAmount, 0);
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-[#09090F] text-white p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }} />
              <h1 className="text-[22px] font-bold">Art: Luxury Serviced Apartment — Admin</h1>
            </div>
            <p className="text-white/40 text-sm">Booking Management Dashboard</p>
          </div>
          <a
            href="/api/admin/export"
            className="inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}
          >
            ⬇ Export to Excel
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Pending", value: pending },
            { label: "Confirmed", value: confirmed },
            { label: "Total Revenue", value: `₹${total.toLocaleString("en-IN")}` },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
              <p className="text-white/40 text-[11px] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-[24px] font-bold" style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {loading && <p className="text-white/40">Loading bookings…</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/[0.07]">
              <h2 className="font-semibold text-[16px]">All Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    {["ID", "Guest", "Room", "Check-in", "Check-out", "Nights", "Amount", "Advance", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-white/40 font-medium text-[11px] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-white/40 font-mono text-[11px]">#{b.id.slice(-6).toUpperCase()}</td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-white">{b.name}</p>
                        <p className="text-white/40 text-[11px]">{b.email}</p>
                        <p className="text-white/40 text-[11px]">{b.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-white/70">{b.roomType}</td>
                      <td className="px-5 py-4 text-white/70">{fmt(b.checkIn)}</td>
                      <td className="px-5 py-4 text-white/70">{fmt(b.checkOut)}</td>
                      <td className="px-5 py-4 text-white/70">{b.totalNights}</td>
                      <td className="px-5 py-4 text-white font-semibold">₹{b.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-4 text-white/70">₹{b.advancePaid.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${STATUS_COLORS[b.status] ?? STATUS_COLORS.pending}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="bg-white/[0.06] border border-white/10 text-white text-[11px] rounded-lg px-2 py-1.5 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan={10} className="text-center py-16 text-white/30">No bookings yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
