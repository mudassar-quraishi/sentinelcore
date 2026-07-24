import React, { useState } from "react";
import { FaTimes, FaEnvelope, FaSpinner } from "react-icons/fa";
import reportService from "../services/reportService";

function EmailDialog({ isOpen, onClose, reportId, reportName, onEmailSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      await reportService.email(reportId, email);
      onEmailSent("Report email sent successfully!");
      onClose();
      setEmail("");
    } catch (error) {
      alert("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md bg-[#111B2E] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden p-8 border border-white/5 space-y-6">
        
        <div className="flex justify-between items-center pb-3 border-b border-white/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FaEnvelope className="text-[#00D4FF]" /> Email Security Report
          </h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors duration-200">
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSend} className="space-y-6">
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Send report <strong className="text-white">{reportName}</strong> to the designated security team or analyst.
          </p>

          <div>
            <label className="block text-[15px] font-semibold text-[#00D4FF] mb-2">
              Recipient Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., analyst@company.com"
              className="w-full h-16 px-5 py-4 border border-transparent rounded-2xl bg-[#243247] hover:bg-[#2C3D56] text-white text-base placeholder-[#94A3B8] focus:outline-none focus:border-[#00D4FF] focus:ring-4 focus:ring-[#00D4FF]/15 transition-all duration-200"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-[52px] px-5 border border-[#334155] rounded-[14px] text-sm font-semibold text-[#94A3B8] hover:bg-[#243247] hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="h-[52px] px-6 bg-gradient-to-r from-[#00D4FF] to-[#0EA5E9] text-white font-bold rounded-[14px] shadow-[0_8px_20px_rgba(0,212,255,0.25)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Sending...
                </>
              ) : (
                "Send Email"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailDialog;
