import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";

import GlassCard from "../components/ui/GlassCard";
import PageHeader from "../components/ui/PageHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import ModernInput from "../components/ui/ModernInput";
import ModernSelect from "../components/ui/ModernSelect";
import FormSection from "../components/ui/FormSection";

function AddAlert() {

    const navigate = useNavigate();

    const [alertData, setAlertData] = useState({
        title: "",
        severity: "",
        source: "",
        status: "",
        description: "",
    });

    const saveAlert = async () => {

        try {

            await api.post("/alerts", alertData);

            alert("Alert Added Successfully");

            navigate("/alert-list");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Alert");

        }

    };

    return (<>
    <Navbar />
    <Sidebar />

    <main className="ml-64 mt-16 min-h-screen bg-slate-950 relative overflow-hidden">

        <AnimatedBackground />

        <div className="relative z-10 p-8">

            <PageHeader
                title="Add Alert"
                subtitle="Create a new security alert"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <GlassCard className="max-w-5xl mx-auto p-10">

                    <FormSection>

                        {/* Alert Title */}

                        <ModernSelect
                            label="Alert Title"
                            value={alertData.title}
                            onChange={(e) =>
                                setAlertData({
                                    ...alertData,
                                    title: e.target.value,
                                })
                            }
                            options={[
                                "Unauthorized Login",
                                "Malware Detected",
                                "SQL Injection",
                                "XSS Attack",
                                "DDoS Attack",
                                "Phishing Attempt",
                                "Privilege Escalation",
                                "Suspicious File",
                                "Port Scan",
                                "Brute Force Attack",
                            ]}
                        />

                        {/* Severity */}

                        <ModernSelect
                            label="Severity"
                            value={alertData.severity}
                            onChange={(e) =>
                                setAlertData({
                                    ...alertData,
                                    severity: e.target.value,
                                })
                            }
                            options={[
                                "Critical",
                                "High",
                                "Medium",
                                "Low",
                            ]}
                        />

                        {/* Source */}

                        <ModernSelect
                            label="Source"
                            value={alertData.source}
                            onChange={(e) =>
                                setAlertData({
                                    ...alertData,
                                    source: e.target.value,
                                })
                            }
                            options={[
                                "Firewall",
                                "IDS",
                                "IPS",
                                "SIEM",
                                "EDR",
                                "XDR",
                                "Antivirus",
                                "Threat Intelligence Feed",
                                "Cloud Security",
                                "Manual Investigation",
                            ]}
                        />

                        {/* Status */}

                        <ModernSelect
                            label="Status"
                            value={alertData.status}
                            onChange={(e) =>
                                setAlertData({
                                    ...alertData,
                                    status: e.target.value,
                                })
                            }
                            options={[
                                "Open",
                                "Investigating",
                                "Resolved",
                            ]}
                        />

                    </FormSection>

                    {/* Description */}

                    <div className="mt-8">

                        <label className="block text-cyan-400 text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            value={alertData.description}
                            onChange={(e) =>
                                setAlertData({
                                    ...alertData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Enter alert description..."
                            className="
                                w-full
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-700
                                px-5
                                py-4
                                text-white
                                placeholder:text-slate-500
                                focus:border-cyan-400
                                focus:ring-2
                                focus:ring-cyan-500/30
                                outline-none
                                resize-none
                            "
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 mt-10">

                        <PrimaryButton
                            onClick={() =>
                                setAlertData({
                                    title: "",
                                    severity: "",
                                    source: "",
                                    status: "",
                                    description: "",
                                })
                            }
                            className="
                                bg-slate-700
                                hover:bg-slate-600
                                text-white
                            "
                        >
                            Reset
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={saveAlert}
                            className="
                                bg-gradient-to-r
                                from-red-600
                                via-orange-500
                                to-yellow-500
                                hover:from-red-500
                                hover:to-yellow-400
                                text-white
                                shadow-xl
                            "
                        >
                            🚨 Save Alert
                        </PrimaryButton>

                    </div>

                </GlassCard>

            </motion.div>

        </div>

    </main>

</>
);

}

export default AddAlert;